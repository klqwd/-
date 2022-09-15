<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { getSuggestionsAPI } from "@/api";
export default {
  props: {
    keywords: {
      type: String,
      required: true,
    },
  },
  watch: {
    keywords: {
      immediate: true,
      handler: "getSuggestions",
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  computed: {
    // 高亮z
    highLightSuggestions() {
      const reg = new RegExp(this.keywords, "ig");
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        );
      });
    },
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords);
        this.suggestions = data.data.options.filter(Boolean);
      } catch (error) {
        if (error.response) {
          this.$toast.fail("获取建议失败");
        } else {
          throw error;
        }
      }
    }, 300),
  },
};
</script>

<style></style>
