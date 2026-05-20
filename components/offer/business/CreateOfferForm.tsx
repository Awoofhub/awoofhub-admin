"use client";

import dayjs from "dayjs";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCategory } from "@/features/category/useCategory";
import { useCreateOffer } from "@/features/offers/useCreateOffer";
import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";

import { CreateOfferFormProps } from "@/types/form-props";
import { CreateOfferData } from "@/types/offer";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { DatePickerField } from "../../date/DatePickerField";
import { GoogleAutocompleteNew } from "../../form/AutoComplete";
import { InputField } from "../../form/InputField";

import { FiGlobe } from "react-icons/fi";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import { FilePond, registerPlugin } from "react-filepond";

import { Button } from '@/components/button/Button';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageValidateSize
);

export const CreateOfferForm = ({ onSuccess }: CreateOfferFormProps) => {

    const { data: categories } = useCategory();
    const createOffer = useCreateOffer({ onSuccess });
    const { uploadPhoto } = useUploadSinglePhoto();

    const filePondRef = useRef<any>(null);

    const {
        register,
        handleSubmit,
        formState,
        control,
        setValue,
        watch,
    } = useForm<CreateOfferData>({
        defaultValues: {
            category: "",
            imageUrl: "",
            endDate: null,
        },
    });

    const category = watch("category");

    const onSubmit = (data: CreateOfferData) => {
        createOffer.submit(data);
    };


    return (
        <div className="mt-5 mb-30 lg:mb-10 mx-auto w-full max-w-2xl">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Category */}
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field, fieldState }) => (
                        <FormControl error={!!fieldState.error} className={`!mb-4 !w-full !rounded-md !shadow-sm !font-baloo !text-lg`}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #D1D5DB",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #D1D5DB",
                                },
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #F97316",
                                },
                                "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e73e3e",
                                },
                            }}
                        >

                            <InputLabel className=" !font-baloo !text-lg"
                                sx={{
                                    color: "#6B7280",

                                    "&:not(.MuiInputLabel-shrink)": {
                                        marginTop: "-5px", // adjust as you like
                                    },

                                    "&.MuiInputLabel-shrink": {
                                        color: "#374151",
                                    },

                                    "&.Mui-focused": {
                                        color: "#f56600",
                                    },

                                    "&.Mui-error": {
                                        color: "#f13939",
                                    },

                                }}
                            >

                                Category</InputLabel>
                            <Select
                                {...field}
                                label="Category"
                                className={`!h-12 !font-baloo !text-lg`}
                            >
                                {categories?.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </FormControl>
                    )}
                />

                {/* Title */}
                <InputField
                    label="Title"
                    type="text"
                    compulsory
                    placeholder="Free Facial Spa Treatment for First-Time Visitors"
                    {...register("title", {
                        required: "Title is required",
                        maxLength: {
                            value: 50,
                            message: "Must be less than 50 characters",
                        },
                    })}
                    error={formState.errors.title}
                />

                {/* Description */}
                <InputField
                    label="Description"
                    placeholder="First-time customers can enjoy a complimentary facial spa treatment at participating GlowSpa locations in Lagos. This limited-time offer includes a full skin consultation, deep cleansing treatment, and facial massage session designed to refresh and revitalize your skin. To redeem the offer, customers must schedule an appointment online and present their confirmation upon arrival."
                    type="textarea"
                    textAreaRows={5}
                    compulsory
                    {...register("description", {
                        required: "Description is required",
                        minLength: {
                            value: 400,
                            message: "Must be more than 400 characters",
                        },
                    })}
                    error={formState.errors.description}
                />

                {/* Value */}
                <InputField
                    label="Value"
                    type="text"
                    placeholder="Free Spa Treatment"
                    compulsory
                    {...register("value", {
                        required: "Value is required",
                         maxLength: {
                            value: 50,
                            message: "Must not be more than 50 characters",
                        },
                    })}
                    error={formState.errors.value}
                />

                {/* Deal URL */}
                <InputField
                    label="Link"
                    type="text"
                    placeholder="https://www.glowspa-demo.com"
                    compulsory
                    icon={<FiGlobe size={18} color="gray" />}
                    {...register("dealUrl", {
                        required: "URL is required",
                        pattern: {
                            value: /^https?:\/\/.+$/,
                            message: "Enter a valid URL (must include http/https)",
                        },
                    })}
                    error={formState.errors.dealUrl}
                />

                {/* Coupon Code */}
                {category === "Coupons" && (
                    <InputField
                        label="Coupon Code"
                        type="text"
                        placeholder="GLOWFREE2026"
                        compulsory
                        {...register("couponCode", {
                            required: "Coupon code is required",
                        })}
                        error={formState.errors.couponCode}
                    />
                )}

                {/* Location */}
                <Controller
                    name="location"
                    control={control}
                    rules={{
                        required: "Location is required",
                    }}
                    render={({ field, fieldState }) => (
                        <GoogleAutocompleteNew
                            label="Location"
                            compulsory
                            value={field.value}
                            onPlaceSelect={field.onChange}
                            error={fieldState.error}
                        />
                    )}
                />

                {/* Terms */}
                <InputField
                    label="Terms & Condition"
                    type="textarea"
                    placeholder="Offer valid for first-time customers only and limited to one redemption per person. Appointment booking is required before visiting any participating location."
                    textAreaRows={2}
                    compulsory
                    {...register("termsAndConditions", {
                        required: "Terms & Conditions is required",
                        minLength: {
                            value: 100,
                            message: "Must be more than 100 characters",
                        },
                    })}
                    error={formState.errors.termsAndConditions}
                />

                {/* End Date */}
                <Controller
                    name="endDate"
                    control={control}
                    rules={{
                        required: "Please select an end date",
                        validate: (val) =>
                            !val ||
                            dayjs(val).isAfter(dayjs().subtract(1, "day")) ||
                            "Date cannot be in the past",
                    }}
                    render={({ field }) => (
                        <DatePickerField
                            label="End Date"
                            compulsory
                            value={field.value}
                            onChange={field.onChange}
                            error={formState.errors.endDate}
                        />
                    )}
                />

                <input
                    type="hidden"
                    {...register("imageUrl", {
                        required: "Image is required",
                    })}
                />

                <div className={`my-8 [&_.filepond--credits]:hidden 
                    [&_.filepond--panel-root]:bg-slate-50 
                    [&_.filepond--panel-root]:border-2 
                    [&_.filepond--panel-root]:border-dashed 
                    ${formState.errors.imageUrl ? "[&_.filepond--panel-root]:border-red-500" : "[&_.filepond--panel-root]:border-blue-200"}
                    [&_.filepond--label-action]:text-blue-600 
                    [&_.filepond--label-action]:font-bold 
                    [&_.filepond--label-action]:no-underline
                    [&_.filepond--drop-label]:text-slate-600 
                    [&_.filepond--drop-label]:cursor-pointer
                    hover:[&_.filepond--panel-root]:border-blue-400`}>
                    <FilePond
                        allowMultiple={false}
                        ref={filePondRef}
                        maxFiles={1}
                        name="image"
                        imageValidateSizeMinWidth={500}
                        imageValidateSizeMinHeight={500}
                        imageValidateSizeMaxWidth={2000}
                        imageValidateSizeMaxHeight={2000}
                        onremovefile={() => {
                            setValue("imageUrl", "", {
                                shouldValidate: true,
                                shouldDirty: true,
                            });
                        }}
                        labelIdle='Drag & Drop Image or <span class="filepond--label-action">Browse</span>'
                        server={{
                            process: async (fieldName, file, metadata, load, error, progress) => {
                                try {
                                    const res = await uploadPhoto(file as File);
                                    setValue('imageUrl', res.data, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                    load(res.data);
                                } catch (err) {
                                    error('Upload failed');
                                }
                            },
                        }}
                    />
                    {formState.errors.imageUrl && (
                        <p className="text-red-500 text-center text-sm mt-1">
                            {formState.errors.imageUrl.message}
                        </p>
                    )}
                </div>

                <Button
                    isLoading={createOffer.isPending}
                    isDisabled={createOffer.isPending}
                    type="submit"

                >
                    Create Offer
                </Button>
            </form>

        </div>
    );
};