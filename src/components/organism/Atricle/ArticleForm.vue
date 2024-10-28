<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
        <InputField
          v-model="formData.title"
          type="text"
          label="title"
          placeholder="Enter your title"
          :error="errors.title"
        />
        <InputField
          v-model="formData.description"
          type="text"
          label="discription"
          placeholder="Enter your discription"
          :error="errors.description"
        />
        <TextArea
          label="body"
          placeholder="Enter your body"
          v-model="formData.body"
        />
      </div>
      <div
        class="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-flex flex-column mb-3"
      >
        <InputField
          v-model="selctedTag"
          type="text"
          label="Tags"
          placeholder="Enter Tag"
          @enter="onTagEnter"
        />
        <TagList v-model="formData.tagList" :tags="computeedTags" />
      </div>
    </div>
    <div class="d-flex">
      <Button type="submit" variant="primary" size="lg" :block="false">
        Submit
      </Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { Button, InputField } from "@/components/atoms";
import TextArea from "@/components/atoms/VtextArea/TextArea.vue";
import TagList from "@/components/molecules/TagList.vue";
import { useArticleStore } from "@/stores/article";
import { computed, onMounted, reactive, ref } from "vue";

interface formeDate {
  data?: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

const props = withDefaults(defineProps<formeDate>(), {
  data: {
    //@ts-ignore
    title: "",
    description: "",
    body: "",
    tagList: [],
  },
});

const errors = ref(props.data);
const tags = ref<string[]>([]);
const selctedTag = ref("");
const formData = reactive(props.data);
const articleStore = useArticleStore();

const emit = defineEmits<{
  (e: "submit", data: formeDate["data"]): void;
}>();

function onTagEnter(ev:KeyboardEvent) {
  ev.preventDefault()
  const tag = selctedTag.value;
  tags.value = [...tags.value, tag];
  selctedTag.value = "";
}


async function handleSubmit() {
  const formDataas: formeDate["data"] = {
    title: formData.title,
    description: formData.description,
    body: formData.body,
    tagList: formData.tagList,
  };

  emit("submit", formDataas);
}

onMounted(() => {
  articleStore.getTags();
});

const computeedTags = computed(() => {
  return [...articleStore.tags, ...tags.value];
});
</script>
