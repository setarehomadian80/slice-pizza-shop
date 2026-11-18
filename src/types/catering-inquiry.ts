
import type { CateringInquirySchema } from "@/schemas/catering-inquiry.schema";

export type CateringInquiryFormProps = {
  initialValues?: Partial<CateringInquirySchema>;

  onSubmit: (
    values: CateringInquirySchema
  ) => Promise<void> | void;
};

export type CateringInquirySubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";
