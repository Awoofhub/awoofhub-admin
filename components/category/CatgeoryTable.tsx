import { useCategory } from "@/features/category/useCategory";
import Table from "../table/Table";
import { CategoryColumns } from "./CategoryColumns";

export default function CategoryTable() {
    const { data: category, isFetched, isFetching } = useCategory();

    return (
        <div>
            <Table
                response={category}
                columns={CategoryColumns}
                rowKey={(category) => category.id}
                isFetching={isFetching}
                isFetched={isFetched}
            />
        </div>
    )
}
