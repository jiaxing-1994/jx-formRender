<template></template>

<script lang="ts">
import { defineComponent, h, watch, onBeforeUnmount, PropType } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

export default defineComponent({
  name: "RichText",
  props: {
    value: {
      type: String as PropType<string>,
      default: "",
    },
    isEdit: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props, context) {
    const editor = new Editor({
      content: props.value,
      autofocus: false,
      onBlur: ({ editor }) => {
        const html = editor.getHTML();
        context.emit("update:value", html);
      },
      editable: props.isEdit,
      extensions: [
        Text,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Document,
        Paragraph,
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell,
        TableHeader,
      ],
    });
    watch(
      () => props.value,
      () => {
        editor.commands.setContent(props.value);
      }
    );
    watch(
      () => props.isEdit,
      () => {
        editor.setEditable(props.isEdit);
      }
    );

    onBeforeUnmount(() => {
      editor.destroy();
    });

    // 创建普通菜单按钮
    const getNameAndFn = (type: string) => {
      switch (type) {
        case "bold":
          return ["f-bold", "bold", {}, "toggleBold", {}];
        case "italic":
          return ["f-italic", "italic", {}, "toggleItalic", {}];
        case "strike":
          return ["f-strikethrough", "strike", {}, "toggleStrike", {}];
        case "code":
          return ["f-code-view", "code", {}, "toggleCode", {}];
        case "paragraph":
          return ["f-text", "paragraph", {}, "setParagraph", {}];
        case "heading1":
          return ["f-h-1", "heading", { level: 1 }, "toggleHeading", { level: 1 }];
        case "heading2":
          return ["f-h-2", "heading", { level: 2 }, "toggleHeading", { level: 2 }];
        case "heading3":
          return ["f-h-3", "heading", { level: 3 }, "toggleHeading", { level: 3 }];
        case "heading4":
          return ["f-h-4", "heading", { level: 4 }, "toggleHeading", { level: 4 }];
        case "heading5":
          return ["f-h-5", "heading", { level: 5 }, "toggleHeading", { level: 5 }];
        case "heading6":
          return ["f-h-6", "heading", { level: 6 }, "toggleHeading", { level: 6 }];
        case "undo":
          return ["f-25chehui", null, {}, "undo", {}];
        case "redo":
          return ["f-26quxiaochehui", null, {}, "redo", {}];
        case "left":
          return ["f-align-left", { textAlign: "left" }, {}, "setTextAlign", "left"];
        case "center":
          return ["f-align-center", { textAlign: "center" }, {}, "setTextAlign", "center"];
        case "right":
          return ["f-align-right", { textAlign: "right" }, {}, "setTextAlign", "right"];
        default:
          return [null, null, null, null, null];
      }
    };
    const onClick = (fnName: string, fnQuery: object) => {
      if (editor) {
        //@ts-ignore
        editor.chain().focus()[fnName](fnQuery).run();
      }
    };
    // 创建表格按钮
    const createTableBtn = () => {
      const tableBtnList = [
        ["f-table-add", "insertTable", { rows: 3, cols: 3, withHeaderRow: true }, false],
        // ['iconClass', 'addColumnBefore', {}, 'addColumnBefore'],
        ["f-add-column", "addColumnBefore", {}, "addColumnAfter"],
        ["f-delete-column", "deleteColumn", {}, "deleteColumn"],
        // ['iconClass', 'addRowBefore', {}, 'addRowBefore'],
        ["f-add-row", "addRowAfter", {}, "addRowAfter"],
        ["f-delete-row", "deleteRow", {}, "deleteRow"],
        ["f-table-remove", "deleteTable", {}, "deleteTable"],
        ["f-mergecell", "mergeCells", {}, "mergeCells"],
        ["f-mergecell", "splitCell", {}, "splitCell"],
        // ['iconClass', 'toggleHeaderColumn', {}, 'toggleHeaderColumn'],
        // ['iconClass', 'toggleHeaderRow', {}, 'toggleHeaderRow'],
        // ['iconClass', 'toggleHeaderCell', {}, 'toggleHeaderCell'],
      ];
      return tableBtnList.map((tableBtn) => {
        const [iconClass, fnName, fnQuery, disabled] = tableBtn;
        //@ts-ignore
        return (
          (!disabled || editor.can()[disabled]()) &&
          h(
            "button",
            {
              class: ["menu-btn", "flex"],
              //@ts-ignore
              onClick: onClick.bind(null, fnName, fnQuery),
            },
            [h("i", { class: `iconfont ${iconClass}` })]
          )
        );
      });
    };
    const createMenuBtn = (type: string) => {
      const [iconClass, name, nameQuery, fnName, fnQuery] = getNameAndFn(type);
      return h(
        "button",
        {
          class: [
            "menu-btn",
            "flex",
            name && editor.isActive(name as any, nameQuery as any) && "is-active",
          ],
          //@ts-ignore
          onClick: onClick.bind(null, fnName, fnQuery),
        },
        [h("i", { class: `iconfont ${iconClass}` })]
      );
    };
    const menuList: string[] = [
      "bold",
      "italic",
      "strike",
      "code",
      "paragraph",
      "heading1",
      "heading2",
      "heading3",
      "heading4",
      "heading5",
      "heading6",
      "left",
      "center",
      "right",
      "undo",
      "redo",
    ];
    const createMenu = () => {
      return h(
        "div",
        {
          class: "menu-wrap flex flex-wrap flex-left",
        },
        [
          ...menuList.map((menu) => createMenuBtn(menu)),
          ...createTableBtn(),
          h("div", {
            class: "menu-shadow",
          }),
        ]
      );
    };
    return () => {
      return h(
        "div",
        {
          class: ["rich-text", props.isEdit && "rich-text_edit"],
        },
        [
          props.isEdit && editor && createMenu(),
          h(EditorContent, {
            class: [props.isEdit && "pd_1"],
            editor,
          }),
        ]
      );
    };
  },
});
</script>

<style lang="less" scoped>
.rich-text {
  &_edit {
    border: solid 1px #ddd;
    border-radius: 5px;
  }
}
.menu-wrap {
  position: relative;
}
.menu-shadow {
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: -30px;
  box-shadow: 0px 11px 12px -12px #ddd inset;
  pointer-events: none;
}
.menu-btn {
  padding: 5px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 5px;
  .iconfont {
    font-size: 20px;
  }
}
.menu-btn:hover {
  background-color: #cce2fa;
}
.is-active {
  background-color: #cce2fa;
}
/deep/.ProseMirror:focus-visible {
  outline: none !important;
}
/deep/.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}
</style>
