import {
  ExternalServiceException,
  InvalidCredentialsException,
  SessionExpiredException,
} from "@/types/errors";
import { NextResponse } from "next/server";

const convertError = (error: unknown): NextResponse => {
  if (error instanceof InvalidCredentialsException)
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 401 },
    );

  if (error instanceof ExternalServiceException)
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 502 },
    );

  if (error instanceof SessionExpiredException)
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 440 },
    );

  if (error instanceof Error)
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 },
    );

  return new NextResponse(
    JSON.stringify({ success: false, message: "Internal Server Error" }),
    { status: 500 },
  );
};

export default convertError;
