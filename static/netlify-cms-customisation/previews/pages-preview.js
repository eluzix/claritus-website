const AboutPreview = createClass({
  render: function () {
    const { entry, getAsset, widgetsFor } = this.props;

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
            { className: "col-7" },
            h("h1", {}, entry.getIn(["data", "introTitle"])),
            h("p", {}, entry.getIn(["data", "introDescription"]))
          ),

          h(
            "div",
            { className: "col-5" },
            h("img", { src: entry.getIn(["data", "heroImgFullHd"]) })
          )
        )
      )
    );
  },
});

CMS.registerPreviewTemplate("about-us", AboutPreview);
