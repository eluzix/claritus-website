

const PostPreview = createClass({
  render: function () {
    const { entry, widgetFor, widgetsFor } = this.props;

    return h(
      "div",
      { className: "container" },

      h(
        "section",
        {},

        h(
          "div",
          { className: "row" },
          h(
            "div",
            { className: "col-5" },
            h("h1", {}, entry.getIn(["data", "title"])),
            h("p", {}, entry.getIn(["data", "description"]))
          ),

          h(
            "div",
            { className: "col-7" },
            h("img", { src: entry.getIn(["data", "thumbnail"]) })
          )
        ),

        h('div', {"className": "text"}, this.props.widgetFor('body'))
      )

      // ================
    );
  },
});

CMS.registerPreviewTemplate("posts", PostPreview);