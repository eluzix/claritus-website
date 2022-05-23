var PostPreview = createClass({
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
          { className: "row align-center" },
          h(
            "div",
            { className: "col-6" },
            h("h1", {}, entry.getIn(["data", "title"])),
            h("p", {}, entry.getIn(["data", "description"]))
          ),

          h(
            "div",
            { className: "col-6" },
            h("img", { src: entry.getIn(["data", "thumbnail"]) })
          )
        ),

        h(
          "div",
          { className: "row justify-center" },
          h(
            "div",
            { className: "col-8" },
            h("div", { className: "article-content" }, widgetFor("body"))
          )
        )
      )

      // ================
    );
  },
});

CMS.registerPreviewTemplate("blog", PostPreview);
