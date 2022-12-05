import vueRouter from "vue-router";

const useRouter = () => {
  const Router = vueRouter.useRouter();
  const Route = vueRouter.useRoute();
  return {
    Route,
    Router,
  };
};

export default useRouter();
