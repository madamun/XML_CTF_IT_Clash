// src/FeedbackPage.tsx (หรือ src/pages/FeedbackPage.tsx แล้วแต่โครงสร้างของคุณ)
// ถ้า FeedbackPage.tsx คือ "หน้า" และจะจัดการ API call เอง
import { TextArea } from '@/components/';
import React, { useState } from "react";
// ตรวจสอบให้แน่ใจว่า path ไปยัง components ของคุณถูกต้อง
// ถ้า @/components ถูกตั้งค่าไว้ใน tsconfig.json หรือ webpack alias ก็จะใช้ได้
// หรือใช้ relative path เช่น import { Button, InputField } from './components';
import { Button, InputField } from "@/components";

// Type สำหรับข้อมูลในฟอร์ม
export type ProductData = {
  report: string;
};

// ไม่จำเป็นต้องมี Props ถ้าหน้านี้เป็นหน้าหลักและไม่ได้รับข้อมูลจาก parent
// type FeedbackPageProps = {
//   initialData?: ProductData;
// };

const FeedbackPage = () => { // ลบ props ออก ถ้าไม่ได้รับมาจาก parent
  const [formData, setFormData] = useState<ProductData>({ report: "" }); // ไม่มี initialData จาก props
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiSuccessMessage, setApiSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitFeedbackToBackend = async (data: ProductData) => {
    const xmlPayloadString = data.report;

    if (!xmlPayloadString || xmlPayloadString.trim() === "") {
      throw new Error("");
    }

    console.log("Sending XML to backend:", xmlPayloadString);

    // --- นี่คือส่วนที่ติดต่อ Backend ---
    const response = await fetch('/api/xxe', { // Endpoint ของ Express API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ xml_payload: xmlPayloadString }), // ส่ง XML string ภายใต้ key 'xml_payload'
    });
    // --- สิ้นสุดส่วนที่ติดต่อ Backend ---

    const result = await response.json(); // อ่าน response เป็น JSON

    if (!response.ok) {
      // ถ้า HTTP status ไม่ใช่ 2xx, ให้ throw error พร้อม message จาก API (ถ้ามี)
      throw new Error(result.error || `เกิดข้อผิดพลาดจากเซิร์ฟเวอร์: ${response.status} ${response.statusText}`);
    }
    
    // ถ้าสำเร็จ
    console.log('API Response from backend:', result);
    // สร้างข้อความที่จะแสดงผล (คุณสามารถปรับแต่งได้)
    return `ส่งข้อมูลสำเร็จ! Message: ${result.message}. Parsed Content: [${result.parsedContent}]. XXE Suspected: ${result.isXxeSuspected}. Original XML: [${result.originalXmlEcho}]`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการ submit ฟอร์มแบบปกติ
    setIsSubmitting(true);
    setSubmitError(null);
    setApiSuccessMessage(null); // เคลียร์ข้อความสำเร็จเก่า

    try {
      const successMsg = await submitFeedbackToBackend(formData);
      setApiSuccessMessage(successMsg);
      setFormData({ report: "" }); // (ทางเลือก) เคลียร์ฟอร์มหลัง submit สำเร็จ
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(error instanceof Error ? error.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุในการส่งข้อมูล");
    } finally {
      setIsSubmitting(false); // Reset สถานะ isSubmitting ไม่ว่าสำเร็จหรือล้มเหลว
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>ส่งข้อเสนอแนะ</h1>
      <form onSubmit={handleSubmit} className="space-y-4" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <TextArea
          label="ข้อเสนอแนะ"
          name="report"
          value={formData.report}
          onChange={handleChange}
          placeholder="ตัวอย่าง"
          rows={6}
        />


        {submitError && (
          <div style={{ color: 'red', backgroundColor: '#ffebee', border: '1px solid #ef9a9a', padding: '10px', borderRadius: '4px', marginTop: '15px' }}>
            <strong>ข้อผิดพลาด:</strong> {submitError}
          </div>
        )}
        {apiSuccessMessage && (
          <div style={{ color: 'green', backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7', padding: '10px', borderRadius: '4px', marginTop: '15px' }}>
            <strong>ผลลัพธ์จากเซิร์ฟเวอร์:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: '5px', backgroundColor: '#fff', padding: '8px', border: '1px solid #eee' }}>
              {apiSuccessMessage}
            </pre>
          </div>
        )}
        <div style={{ paddingTop: '10px', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button 
            text="ส่งข้อมูล" 
            type="submit" 
            loading={isSubmitting} 
            disabled={isSubmitting} 
            // สมมติว่า Button component ของคุณมี style prop หรือ classNames สำหรับ styling
          />
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;