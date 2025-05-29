import { Checkbox } from "../ui/checkbox";

export const PasswordCheckbox = ({
  showPassword,
  setShowPassword,
}: {
  showPassword: any;
  setShowPassword: any;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="showPassword"
        checked={showPassword}
        onCheckedChange={(checked: any) => setShowPassword(checked)}
      />
      <label
        htmlFor="showPassword"
        className="text-sm text-[#71717a] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show password
      </label>
    </div>
  );
};
