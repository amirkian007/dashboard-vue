type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "outline-primary"
  | "outline-dark";

type ButtonSize = "sm" | "lg" | "";

//*********** */
//Note :  The js docs are generated with Ai
//*********** */
export interface buttonProps {
  /**
   * The variant of the button, determining its style.
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * The size of the button.
   * @default ""
   */
  size?: ButtonSize;
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
   /**
   * Whether the button is full witdth.
   * @default false
   */
  block?: boolean;
}
