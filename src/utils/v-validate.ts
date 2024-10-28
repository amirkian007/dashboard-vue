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
