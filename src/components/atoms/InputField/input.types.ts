type InputType = "text" | "email" | "password" | "number";
type InputSize = "sm" | "lg" | "";

//*********** */
//Note :  The js docs are generated with Ai
//*********** */

export interface inputProps {
  /**
   * The model value of the input.
   */
  modelValue: string;
  /**
   * The type of the input element.
   * @default 'text'
   */
  type?: InputType;
  /**
   * The label displayed for the input.
   */
  label?: string;
  /**
   * The placeholder text displayed when the input is empty.
   */
  placeholder?: string;
  /**
   * The size of the input.
   */
  size?: InputSize;
  /**
   * Indicates whether the input is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The error message displayed for the input.
   */
  error?: string;
}
