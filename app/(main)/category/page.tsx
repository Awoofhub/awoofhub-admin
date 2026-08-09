'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { formatDateTime } from '@/utils/formatDateTime';
import PaginationButtons from '@/components/button/PaginationButtons';
import SearchInput from '@/components/offers/admin/SearchInput';
import  useCategoriesAdmin  from '@/features/category/useCategoriesAdmin';
import { useCategoryMutations } from '@/features/category/useCategoryMutations';

export default function CategoryPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { data, isLoading, error } = useCategoriesAdmin(search, page, 10);
    const { createCategory, updateCategory, deleteCategory, isCreating, isUpdating, isDeleting } = useCategoryMutations();

    // Modal States
    const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'create' | 'edit' | 'delete' | null; categoryId: string | null; name: string }>({
        isOpen: false, type: null, categoryId: null, name: ''
    });

    const openModal = (type: 'create' | 'edit' | 'delete', id: string | null = null, currentName: string = '') => {
        setModalState({ isOpen: true, type, categoryId: id, name: currentName });
    };

    const closeModal = () => setModalState({ isOpen: false, type: null, categoryId: null, name: '' });

    const handleSubmit = () => {
        if (modalState.type === 'create' && modalState.name.trim()) {
            createCategory(modalState.name.trim(), { onSuccess: closeModal });
        } else if (modalState.type === 'edit' && modalState.categoryId && modalState.name.trim()) {
            updateCategory({ id: modalState.categoryId, name: modalState.name.trim() }, { onSuccess: closeModal });
        } else if (modalState.type === 'delete' && modalState.categoryId) {
            deleteCategory(modalState.categoryId, { onSuccess: closeModal });
        }
    };

    const isPending = isCreating || isUpdating || isDeleting;

    if (error) return <div className="p-8 text-red-500">Error loading categories.</div>;

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden relative">
            <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-360 flex flex-col h-full">

                {/* Header */}
                <header className="mb-4 sm:mb-6 shrink-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Categories</h1>
                    <button onClick={() => openModal('create')} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm transition-colors w-full sm:w-auto">
                        <Plus className="w-4 h-4" /> Add Category
                    </button>
                </header>

                <div className="mb-4 sm:mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg shrink-0 flex gap-3 w-full ">
                    <SearchInput
                        value={search}
                        onChange={(val: string) => { setSearch(val); setPage(1); }}
                        placeholder="Search categories..."
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg border border-gray-100">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                    ) : data?.categories && data.categories.length > 0 ? (
                        <>
                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-left shadow-sm whitespace-nowrap">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider sticky top-0 z-10">
                                        <tr>
                                            <th className="px-4 py-4">Name</th>
                                            <th className="px-4 py-4">Slug</th>
                                            <th className="px-4 py-4">Created Date</th>
                                            <th className="px-4 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.categories.map((cat: any) => (
                                            <tr key={cat.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 text-sm">
                                                <td className="px-4 py-4 font-bold text-gray-800">{cat.name}</td>
                                                <td className="px-4 py-4 text-gray-500 font-mono text-xs">{cat.slug}</td>
                                                <td className="px-4 py-4 text-gray-500">{cat.createdAt ? formatDateTime(cat.createdAt) : '—'}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => openModal('edit', cat.id, cat.name)} className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Edit">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => openModal('delete', cat.id, cat.name)} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors" title="Delete">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <PaginationButtons totalPages={data.totalPages} currentPage={data.currentPage} onPageChange={(p) => setPage(p)} />
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-bold text-gray-700">No Categories Found</h2>
                            <p className="text-sm text-gray-500">Create one to get started.</p>
                        </div>
                    )}
                </div>

                {/* Single Modal handling Create, Edit, and Delete */}
                {modalState.isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
                        <div className="bg-white rounded-xl p-6 sm:p-8 max-w-sm w-full shadow-2xl">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                                {modalState.type} Category
                            </h2>

                            {modalState.type === 'delete' ? (
                                <p className="text-gray-600 mb-6 text-sm">Are you sure you want to delete the category <span className="font-bold text-gray-900">&quot;{modalState.name}&quot;</span>? This action cannot be undone.</p>
                            ) : (
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        value={modalState.name}
                                        onChange={(e) => setModalState(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g. Promotions"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-primary"
                                        autoFocus
                                    />
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isPending || (modalState.type !== 'delete' && !modalState.name.trim())}
                                    className={`flex-1 px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 transition-colors ${modalState.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}`}
                                >
                                    {isPending ? 'Saving...' : modalState.type === 'delete' ? 'Delete' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}