// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// export const fetchQuestion = async (data: object) => {
//   try {
//       const res = await fetch(`${apiUrl}/api/questions`);

//     if (res.ok) {
//       return await res.json();
//     } else {
//       console.error("Failed to fetch data:", res.statusText);
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// };

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchQuestion = async (
  data: Record<string, string | string[]>,
) => {
  // 객체를 쿼리 파라미터 문자열로 변환
  //   const queryParams = new URLSearchParams(data).toString();
  //
  try {
    const res = await fetch(
      `${apiUrl}/api/questions?q1=${data["q1"]}&q2=${data.q2}&q3=${data.q3}&q4=${data.q4}&q5=${data.q5}`,
    );
    console.log("res>>", res);
    if (res.ok) {
      return await res.json();
    } else {
      console.error("Failed to fetch data:", res.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
