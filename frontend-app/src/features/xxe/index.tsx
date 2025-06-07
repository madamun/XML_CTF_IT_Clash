import { useState, useEffect } from "react";
import { Button, InputField, Navbar, Footer} from "@/components";
type ProductFormProps = {
  onChange?: (data: ProductData) => void;
};

export type ProductData = {
  name: string;
  price: string;
  description: string;
};

const ProductForm = ({ onChange }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    price: "",
    description: "",
  });

  // ส่งค่ากลับให้ parent component ถ้ามี onChange
  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      {/* ชื่อสินค้า */}
      <div>
        <label className="block font-medium mb-1">ชื่อสินค้า</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="เช่น กระเป๋าผ้าร่ม"
        />
      </div>

      {/* ราคา */}
      <div>
        <label className="block font-medium mb-1">ราคา (บาท)</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="เช่น 150"
        />
      </div>

      {/* รายละเอียดสินค้า */}
      <div>
        <label className="block font-medium mb-1">รายละเอียดสินค้า</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded h-32 resize-none"
          placeholder="รายละเอียด จุดเด่น หรือการใช้งาน"
        />
      </div>
      <div className="">
          <Button text="Submit" onClick={() => alert("Clicked!")} />
        </div>
    </div>
  );
};

export default ProductForm;
