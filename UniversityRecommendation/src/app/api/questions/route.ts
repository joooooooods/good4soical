// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   console.log("route>>", req.json());
//     try {

//     const res = await fetch(
//       "http://10.150.1.148:8000/?q1=%EA%B5%AD%EC%96%B4,%20%EC%88%98%ED%95%99,%20%ED%83%90%EA%B5%AC1,%20%ED%83%90%EA%B5%AC2,%20%EC%98%81%EC%96%B4&q2=%EB%AC%B4%EA%B4%80&q3=%EB%AC%B4%EA%B4%80&q4=%EB%AC%B4%EA%B4%80&q5=%EC%98%88",
//     );
//     if (res.ok) {
//       const data = await res.json();
//       console.log("data>>", data);
//       return NextResponse.json(data);
//     } else {
//       return new Response("Failed to fetch data", { status: res.status });
//     }
//   } catch (error: any) {
//     console.error("error>>", error);
//     return new Response(
//       JSON.stringify({
//         error: error?.message,
//       }),
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("route>>");
  try {
    const url = new URL(req.url);
    const data = Object.fromEntries(url.searchParams.entries());
    console.log("Received data:", data);

    // 데이터를 이용해 API 호출
    const queryParams = new URLSearchParams(data).toString();
    console.log("queryParams>>", queryParams);
    const res = await fetch(`http://10.150.1.148:8000?${queryParams}`);

    if (res.ok) {
      const responseData = await res.json();
      return NextResponse.json(responseData);
    } else {
      return new Response("Failed to fetch data", { status: res.status });
    }
  } catch (error: any) {
    console.error("error>>", error);
    return new Response(
      JSON.stringify({
        error: error?.message,
      }),
      { status: 500 },
    );
  }
}
