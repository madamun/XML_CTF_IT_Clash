import React, { useState, useEffect } from "react";
import { Button, InputField } from "@/components";

export type ProductData = {
  name: string;
  price: string;
  description: string;
};

type ProductFormProps = {
  initialData?: ProductData;
  onSubmit: (data: ProductData) => void;
};

const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductData>(
    initialData || { name: "", price: "", description: "" }
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // <--- เพิ่ม state นี้
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => { // <--- ทำให้เป็น async
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null); // เคลียร์ error เก่าก่อน submit ใหม่

    try {
      await onSubmit(formData); // <--- รอให้ onSubmit ทำงานเสร็จ
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField 
        label="ชื่อสินค้า"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="เช่น กระเป๋าผ้าร่ม"
      />
      <InputField 
        label="ราคา"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="เช่น 150"
      />
      <InputField 
        label="รายละเอียดสินค้า"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="รายละเอียด จุดเด่น หรือการใช้งาน"
      />

      {submitError && ( // <--- แสดงข้อความ error
        <div className="text-red-500 text-sm">{submitError}</div>
      )}
      <div className="py-2 justify-end flex">
        <Button text="Submit Product" type="submit" loading={isSubmitting} disabled={isSubmitting} />
      </div>
    </form>
  );
};

export default ProductForm;