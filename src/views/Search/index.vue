<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @focus="isShowSearchResult = false"
        show-action
        @search="onSearch"
        @cancel="$router.push('/')"
      />
    </form>
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import SearchHistory from "./components/SearchHistory.vue";
import SearchSuggestion from "./components/SearchSuggestion.vue";
import SearchResult from "./components/SearchResult.vue";
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      keywords: "",
      isShowSearchResult: false,
    };
  },
  computed: {
    ...mapState(["histories"]),
    componentName() {
      if (this.keywords === "") {
        return "SearchHistory";
      }
      if (this.isShowSearchResult) {
        return "SearchResult";
      }
      return "SearchSuggestion";
    },
  },
  methods: {
    ...mapMutations(["SET_HISTORIES"]),
    onSearch(keywords) {
      //去重:1.获取没有去重的数组 2.放在new Set(arr) 3.[...set]
      const distinctHistories = [...new Set([keywords, ...this.histories])];
      this.SET_HISTORIES(distinctHistories);
      this.keywords = keywords;
      this.isShowSearchResult = true;
    },
  },
};
</script>

<style scoped lang="less">
.search {
  [role="button"] {
    color: #fff;
  }
}
</style>
