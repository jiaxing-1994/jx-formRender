<script lang="ts">
import { defineComponent, h, resolveComponent, PropType } from "vue";
import { useCreateCpn } from "@lc/useHooks";
import { CpnInfo } from "lc/types/index.d";

export default defineComponent({
  name: "SearchCondition",
  props: {
    cpns: Array as PropType<CpnInfo[]>,
  },
  setup(props) {
    const { createCpnFactory } = useCreateCpn();
    const createForm = (children: any) => {
      return h(
        resolveComponent("wkForm"),
        {
          layout: "horizontal",
        },
        children
      );
    };
    const createFormItem = (children: any) => {
      return h(resolveComponent("wkFormItem"), children);
    };
    return () => createForm(props.cpns.map((cpn) => createFormItem(createCpnFactory(cpn))));
  },
});
</script>

<style lang="less" scoped>
.search-condition {
}
</style>
