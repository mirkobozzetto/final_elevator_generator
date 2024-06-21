import { InputFileProps } from "@/types/types";

const InputFile = ({ onChange }: InputFileProps) => (
  <label className="form-control w-full max-w-xs">
    <input
      accept="image/*"
      type="file"
      className="w-full max-w-xs file-input file-input-primary file-input-sm"
      onChange={onChange}
    />
  </label>
);

export default InputFile;
