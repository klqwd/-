<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败,点击重新加载"
        finished-text="没有更多文章了~~"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api";
import ArticleItem from "./ArticleItem.vue";
export default {
  components: { ArticleItem },
  name: "ArticleList",
  data() {
    return {
      articles: [],
      preTimestamp: [],
      loading: false,
      finished: "",
      refreshLoading: "",
    };
  },
  props: {
    id: [String, Number],
  },
  created() {
    this.getFirstPageArticle();
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date());
        this.articles = data.data.results;
        // 保存下一页的时间，用于分页
        this.preTimestamp = data.data.pre_timestamp;
      } catch (error) {
        const status = error.response?.status;
        if (!error.response || status === 507) {
          throw error;
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message);
          }
        }
      }
    },
    async getNextPageArticle() {
      //1.发送请求
      try {
        const { data } = await getArticles(this.id, this.preTimestamp);
        if (!data.data.pre_timestamp) {
          this.finished = true;
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results);
        } else {
          this.articles.push(...data.data.results);
        }

        //3.更新时间
        this.preTimestamp = data.data.pre_timestamp;
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
        this.refreshLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article {
  height: 100vh-7vh-6.7vh-7.6vh;
  overflow: auto;
}
</style>
