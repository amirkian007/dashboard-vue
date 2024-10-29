import { onUnmounted, Directive } from "vue";

export const vHighlight: Directive = {
  mounted(el) {
    const onBlur = () => {
      if (!el.checkValidity()) {
        el.classList.add("input-blured");
      } else {
        el.classList.remove("input-blured");
      }
    };

    el.addEventListener("blur", onBlur);

    onUnmounted(() => {
      el.removeEventListener("blur", onBlur);
    });
  },
};
export const vValidateform: Directive = {
  mounted(form:HTMLElement) {
    const onBlur = () => {
      form.classList.add("form-validate");
    };
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    submitButton?.addEventListener("click", onBlur);

    onUnmounted(() => {
      submitButton?.removeEventListener("click", onBlur);
    });
  },
};
