import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageOptimizer } from "next/image";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const optimizeImage = async (dataUrl) => {
  const optimized = await ImageOptimizer.optimize(dataUrl, {
    quality: 85,
    format: "webp",
  });
  return optimized;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, recipientType } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Định nghĩa chi tiết hơn về mối quan hệ và đặc điểm
    const relationshipContext = {
      mother: {
        relationship: "người mẹ thân yêu",
        qualities: "tình yêu vô điều kiện, sự hy sinh, lòng nhân ái",
        emotions: "biết ơn sâu sắc, kính trọng, yêu thương",
        activities: "chăm sóc gia đình, nuôi dạy con cái, tạo dựng tổ ấm",
      },
      sister: {
        relationship: "người chị/em gái thân thương",
        qualities: "sự đồng hành, tình cảm gia đình, sự gắn bó",
        emotions: "thân thiết, gần gũi, trân trọng",
        activities: "chia sẻ kỷ niệm, hỗ trợ lẫn nhau, cùng trưởng thành",
      },
      wife: {
        relationship: "người bạn đời, người vợ yêu thương",
        qualities: "sự thấu hiểu, đồng hành, chung thủy",
        emotions: "yêu thương sâu đậm, trân trọng, biết ơn",
        activities:
          "xây dựng tổ ấm, chia sẻ cuộc sống, cùng vượt qua thử thách",
      },
      teacher: {
        relationship: "người cô giáo kính mến",
        qualities: "tận tâm, trí tuệ, kiên nhẫn, tâm huyết",
        emotions: "kính trọng, biết ơn, ngưỡng mộ",
        activities:
          "truyền đạt kiến thức, định hướng tương lai, nuôi dưỡng tâm hồn",
      },
      friend: {
        relationship: "người bạn thân thiết",
        qualities: "chân thành, đáng tin cậy, thấu hiểu",
        emotions: "quý mến, trân trọng, gắn bó",
        activities: "chia sẻ niềm vui nỗi buồn, đồng hành trong cuộc sống",
      },
      colleague: {
        relationship: "người đồng nghiệp quý mến",
        qualities: "chuyên nghiệp, hỗ trợ, tinh thần đồng đội",
        emotions: "tôn trọng, quý mến, đồng cảm",
        activities:
          "hợp tác công việc, chia sẻ mục tiêu chung, cùng phát triển",
      },
    };

    const context = relationshipContext[recipientType];

    const enhancedPrompt = `
    Viết lời chúc ngày 8/3 ngắn gọn, ý nghĩa cho ${name} - ${context.relationship}.
  
    Thông tin về mối quan hệ:
    - Đặc điểm: ${context.qualities}
    - Cảm xúc: ${context.emotions}
  
    Yêu cầu:
    1. Ngắn gọn: 3-4 câu (tối đa 70 từ)
    2. Mở đầu bằng lời chúc mừng ngày 8/3 ấm áp, gọi tên người nhận, tuỳ vào đối tượng mà phải có tiền tố đi kèm cho lịch sự, phải phép
    3. Nhắc đến một phẩm chất đặc biệt của họ
    4. Thêm một câu thơ lục bát đơn giản (chỉ 2 câu)
    5. Kết thúc bằng lời chúc hạnh phúc ngắn gọn nên sử dụng 3, 4 từ để chúc
  
    Văn phong:
    - Ngôn ngữ tự nhiên, đời thường, không sến súa
    - Xưng hô phù hợp với mối quan hệ
    - Chân thành, tránh klisê
    - Tạo cảm giác riêng tư, cá nhân hóa
  
    Hãy tạo lời chúc ngắn gọn nhưng đầy ý nghĩa.`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ wish: text });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to generate wish" });
  }
}
