"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generateBlogPostAction,
  transcribeUploadedFile,
} from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must not exceed 20MB"
    )
    .refine(
      (file) =>
        file.type.startsWith("audio/") || file.type.startsWith("video/"),
      "File must be an audio or a video file"
    ),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("videoOrAudioUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Error occurred", err);
    },
    onUploadBegin: () => {
      toast.success("Upload has begun 🚀!");
    },
  });

  const handleTranscribe = async (formData: FormData) => {
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.log(
        "validatedFields",
        validatedFields.error.flatten().fieldErrors
      );
      toast.error(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
        {
          description: "❌ Something went wrong",
        }
      );
    }

    if (file) {
      const resp: any = await startUpload([file]);
      console.log({ resp });

      if (!resp) {
        toast.error("Please use a different file", {
          description: "Something went wrong",
        });
      }
      toast.success("Hang tight! Our digital wizards are sprinkling magic dust on your file! ✨", {
        description: "🎙️ Transcription is in progress...",
      });

      const result = await transcribeUploadedFile(resp);
      const { data = null, message = null } = result || {};

      if (!result || (!data && !message)) {
        toast.error("An error occurred during transcription. Please try again.", {
          description: "An unexpected error occurred",
        });
      }

      if (data) {
        toast.success("Please wait while we generate your blog post.", {
          description: "🤖 Generating AI blog post...",
        });

        await generateBlogPostAction({
          transcriptions: data.transcriptions,
          userId: data.userId,
        });

        toast.success("Time to put on your editor hat, Click the post and edit it!", {
          description: "🎉 Woohoo! Your AI blog is created! 🎊",
        });
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" action={handleTranscribe}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="file"
          name="file"
          type="file"
          accept="audio/*,video/*"
          required
        />
        <Button className="bg-purple-600">Transcribe</Button>
      </div>
    </form>
  );
}