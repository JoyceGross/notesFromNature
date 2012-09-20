/*
* common.ui.view.Widget
*
*/
describe("common.ui.view.Widget", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.Widget({
      model: new nfn.ui.model.Widget()
    });

  });

  afterEach(function() {

    widget.clean();

  });

  it("should allow to show the widget", function() {

    widget.show();
    expect(widget.model.get("hidden")).toEqual(false);

  });

  it("should allow to hide the widget", function() {

    widget.hide();
    expect(widget.model.get("hidden")).toEqual(true);

  });

  it("should allow to set the position of the magnifier", function() {

    widget.setPosition(300, 200);
    widget.$el.css("position", "absolute");

    expect(widget.$el.css("left")).toEqual("300px");
    expect(widget.$el.css("top")).toEqual("200px");

  });

  it("should return the width of the widget", function() {

    widget.$el.css("width", 50);
    expect(widget.width()).toEqual(50);

    widget.setSize(200, 100);
    expect(widget.width()).toEqual(200);

  });

  it("should return the height of the widget", function() {

    widget.$el.css("height", 50);
    expect(widget.height()).toEqual(50);

    widget.setSize(100, 500);
    expect(widget.height()).toEqual(500);

  });

  it("should allow to set the top position of the widget", function() {

    widget.setPosition(100, 200);
    widget.setTop(500);

    expect(widget.$el.css("top")).toEqual("500px");
    expect(widget.$el.css("left")).toEqual("100px");
    expect(widget.getPosition()).toEqual({ y: 500, x: 100 });

  });

  it("should allow to set the left position of the widget", function() {

    widget.setPosition(100, 200);
    widget.setLeft(500);

    expect(widget.$el.css("top")).toEqual("200px");
    expect(widget.$el.css("left")).toEqual("500px");
    expect(widget.getPosition()).toEqual({ x: 500, y: 200 });

  });

  it("should allow to set the height of the widget", function() {

    widget.setSize(100, 200);
    widget.setHeight(500);

    expect(widget.$el.css("width")).toEqual("100px");
    expect(widget.$el.css("height")).toEqual("500px");
    expect(widget.getSize()).toEqual({ w: 100, h: 500 });

  });

  it("should allow to set the width of the widget", function() {

    widget.setSize(100, 200);
    widget.setWidth(300);

    expect(widget.$el.css("width")).toEqual("300px");
    expect(widget.$el.css("height")).toEqual("200px");
    expect(widget.getSize()).toEqual({ w: 300, h: 200 });

  });

  it("should allow to resize the widget", function() {

    widget.setSize(100, 200);

    expect(widget.$el.css("width")).toEqual("100px");
    expect(widget.$el.css("height")).toEqual("200px");
    expect(widget.getSize()).toEqual({ w: 100, h: 200 });

  });

});


/*
* common.ui.view.Tooltip
*
*/
describe("common.ui.view.Tooltip", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.Tooltip({
      model: new nfn.ui.model.Tooltip(),
      template: $("#tooltip-template").html()
    });

  });

  afterEach(function() {

    widget.clean();

  });

  it("should load an image", function() {

    var widget2 = new nfn.ui.view.Tooltip({

      model: new nfn.ui.model.Tooltip({
        url: "http://placehold.it/100x100"
      }),

      template: $("#tooltip-example-template").html()

    });

    widget2.render();

    waits(250);

    runs(function () {
      expect(widget2.$el.find("img").length).toEqual(1);
    });

  });

  it("should allow to change the template", function() {

    widget.render();

    widget.model.set("template", "<span>Hola</span>");
    expect(widget.$el.find("span").length).toEqual(1);

  });

  it("should have a title", function() {

    widget.render();

    expect(widget.$title).toEqual(widget.$el.find(".title"));
    expect(widget.$el.find(".title").length).toBeTruthy();

  });

  it("should have a description", function() {

    widget.render();

    expect(widget.$description).toEqual(widget.$el.find(".description"));
    expect(widget.$el.find(".description").length).toBeTruthy();

  });

  it("should have a main button", function() {

    widget.render();

    expect(widget.$mainButton).toEqual(widget.$el.find(".main"));
    expect(widget.$el.find(".main").length).toBeTruthy();

  });

  it("should fire an event when the user clicks in the main button", function() {

    widget.render();

    var spy = spyOn(widget, 'onMainClick');

    widget.delegateEvents();
    widget.$mainButton.click();

    expect(spy).toHaveBeenCalled();

  });

  it("should have a secondary button", function() {

    widget.render();

    expect(widget.$secondaryButton).toEqual(widget.$el.find(".secondary"));
    expect(widget.$el.find(".secondary").length).toBeTruthy();

  });

  it("should fire an event when the user clicks in the secondary button", function() {

    widget.render();

    var spy = spyOn(widget, 'onSecondaryClick');

    widget.delegateEvents();
    widget.$secondaryButton.click();

    expect(spy).toHaveBeenCalled();

  });

  it("should fire a close event when the user press the esc key", function() {

    widget.render();

    var spy = spyOn(widget, 'onEscKey');

    widget.delegateEvents();
    $(document).trigger({ type: 'keyup', which: "27" });

    expect(spy).toHaveBeenCalled();

  });

});

/*
* common.ui.view.StatusBar
*
*/
describe("common.ui.view.StatusBar", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.StatusBar({
      model: new nfn.ui.model.StatusBar({ title: "a", description: "b" }),
      template: $("#statusbar-template").html()
    });

  });

  afterEach(function() {

    widget.clean();

  });

  it("should have a title", function() {
    widget.render();
    expect(widget.$title).toEqual(widget.$el.find(".title"));
    expect(widget.$el.find('.title').length).toEqual(1);
  });

  it("should have a description", function() {
    widget.render();
    expect(widget.$description).toEqual(widget.$el.find(".description"));
    expect(widget.$el.find('.description').length).toEqual(1);
  });

  it("should have a record counter", function() {
    widget.render();
    expect(widget.$counter).toEqual(widget.$el.find(".counter"));
    expect(widget.$el.find('.counter').length).toEqual(1);
  });


});

/*
* common.ui.view.Highlight
*
*/
describe("common.ui.view.Highlight", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.Highlight({
      model: new nfn.ui.model.Highlight(),
      template: $("#highlight-template").html()
    });

  });

  afterEach(function() {

    widget.clean();

  });

  it("should have a close button", function() {

    widget.render();
    widget.setPosition(300, 200);
    widget.$el.css("position", "absolute");

    expect(widget.$closeButton).toEqual(widget.$el.find(".close"));
    expect(widget.$el.find(".close").length).toBeTruthy();

  });

  it("should fire an event when the user clicks in the close button", function() {
    widget.render();

    var spy = spyOn(widget, 'close');

    widget.delegateEvents();
    widget.$closeButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it("shouldn't be defined if the dimensions aren't set", function() {
    widget.render();
    widget.setPosition(100, 100);
    expect(widget.isDefined()).toEqual(false);
  });

  it("should be defined if the dimensions are set", function() {
    widget.render();
    widget.setSize(100, 100);
    widget.setPosition(100, 100);
    expect(widget.isDefined()).toEqual(true);
  });

  it("should have a clear method", function() {
    widget.render();
    widget.setPosition(300, 200);
    widget.setSize(300, 200);
    widget.$el.css("position", "absolute");
    widget.clear();
    expect(widget.isDefined()).toEqual(false);
  });

  it("should hide the highlight when the close button is clicked", function() {
    widget.render();
    widget.$closeButton.click();
    expect(widget.model.get("hidden")).toEqual(true);
  });

  it("should fire an event on click", function() {

    widget.render();

    var spy = spyOn(widget, 'start');

    widget.delegateEvents();
    widget.$el.click();

    expect(spy).toHaveBeenCalled();

  });

});


/*
* common.ui.view.SernacTranscriber
*
*/
describe("common.ui.view.SernacTranscriber", function() {

  var sernacTranscriber;

  beforeEach(function() {

    sernacTranscriber = new nfn.ui.view.SernacTranscriber({
      model: new nfn.ui.model.Sernac(),
      widgetTemplate: "<strong>hola</strong>"
    });


  });

  afterEach(function() {
    sernacTranscriber.clean();
  });

  it("should have a transcriber widget", function() {
    expect(sernacTranscriber.transcriberWidget).toBeDefined();
  });

  it("should have a backdrop", function() {
    expect(sernacTranscriber.backdrop).toBeDefined();
  });

  it("should have a helper", function() {
    expect(sernacTranscriber.helper).toBeDefined();
  });

  it("should have an status bar", function() {
    expect(sernacTranscriber.statusBar).toBeDefined();
  });

  it("should have a highlight", function() {
    expect(sernacTranscriber.highlight).toBeDefined();
  });

  it("should have a launch bar", function() {
    expect(sernacTranscriber.launcher).toBeDefined();
  });

  it("the launcher's start button should be initially disabled", function() {
    expect(sernacTranscriber.launcher.$startButton.hasClass('disabled')).toEqual(true);
  });

  it("should have a spinner", function() {
    expect(sernacTranscriber.spinner).toBeDefined();
  });

  it("should have a selection", function() {
    expect(sernacTranscriber.selection).toBeDefined();
  });

  it("should have a current record number", function() {
    expect(sernacTranscriber.model.get("currentRecord")).toBeDefined();
  });

  it("should have a current step number", function() {
    expect(sernacTranscriber.model.get("currentStep")).toBeDefined();
  });

  it("should have a number of steps", function() {
    expect(sernacTranscriber.model.get("stepsCount")).toBeDefined();
  });

  it("should have a guide", function() {
    expect(sernacTranscriber.guide).toBeDefined();
  });

  it("should have a magnifier", function() {
    expect(sernacTranscriber.magnifier).toBeDefined();
  });

  it("should have an onResize method", function() {

    expect(sernacTranscriber.onResize).toBeDefined();

  });

  // TODO: move
  it("should allow to show the magnifier", function() {

    var $widget = $(sernacTranscriber.magnifier.$el);
    sernacTranscriber.magnifier.show();
    expect(sernacTranscriber.magnifier.model.get("hidden")).toEqual(false);

  });

  it("should allow to hide the magnifier", function() {

    var $widget = $(sernacTranscriber.magnifier.$el);
    sernacTranscriber.magnifier.hide();
    expect(sernacTranscriber.magnifier.model.get("hidden")).toEqual(true);

  });

  it("should allow to set the dimensions of the magnifier", function() {

    sernacTranscriber.magnifier.setDimensions({ x: 10, y: 10, w: 90, h: 90 });
    sernacTranscriber.magnifier.$el.css("position", "absolute");

    expect(sernacTranscriber.magnifier.$el.css("left")).toEqual("10px");
    expect(sernacTranscriber.magnifier.$el.css("top")).toEqual("10px");
    expect(sernacTranscriber.magnifier.$el.css("width")).toEqual("90px");
    expect(sernacTranscriber.magnifier.$el.css("height")).toEqual("90px");

  });

  it("should create a selection", function() {
    sernacTranscriber.addSelection();
    expect(sernacTranscriber.$el.find(".selection").length).toEqual(1);
  });

  it("should allow to remove the selection", function() {
    sernacTranscriber.removeSelection();
    expect(sernacTranscriber.$el.find(".selection").length).toEqual(0);
  });

  it("should allow to update the selection", function() {
    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");

    expect(sernacTranscriber.selection.$el.css("left")).toEqual("10px");
    expect(sernacTranscriber.selection.$el.css("top")).toEqual("10px");
    expect(sernacTranscriber.selection.$el.css("width")).toEqual("90px");
    expect(sernacTranscriber.selection.$el.css("height")).toEqual("90px");
  });

  it("should add the cursor crosshair of the image when the transcribing begins", function() {

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");

    sernacTranscriber.addHighlight(sernacTranscriber.selection.getDimensions());
    sernacTranscriber.highlight.$closeButton.click();

    expect(sernacTranscriber.$el.find(".photos").hasClass("selectable")).toEqual(true);
  });

  it("should remove the cursor crosshair of the image after a highlight is added", function() {

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");

    sernacTranscriber.addHighlight(sernacTranscriber.selection.getDimensions());

    expect(sernacTranscriber.$el.find(".photos").hasClass("selectable")).toEqual(false);
  });

  it("should enable the start button after a highlight is added", function() {

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");

    sernacTranscriber.addHighlight(sernacTranscriber.selection.getDimensions());

    expect(sernacTranscriber.launcher.$el.find(".start").hasClass("disabled")).toEqual(false);
  });

  it("should disable the start button after a highlight is closed", function() {

    sernacTranscriber.addHighlight({ x: 1, y: 1, w: 100, h: 100 });
    sernacTranscriber.highlight.$closeButton.click();

    expect(sernacTranscriber.launcher.$el.find(".start").hasClass("disabled")).toEqual(true);
  });

  it("should create a highlight", function() {

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");

    sernacTranscriber.addHighlight(sernacTranscriber.selection.getDimensions());

    expect(sernacTranscriber.$el.find(".highlight").length).toEqual(1);
  });

  it("cliking in the startButton should add a magnifier", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.launcher.$startButton.removeClass("disabled");
    sernacTranscriber.launcher.$startButton.click();

    expect(sernacTranscriber.$el.find(".magnifier").length).toEqual(1);
  });

  it("cliking in the disabled startButton should not add a magnifier", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.launcher.disable();
    sernacTranscriber.launcher.$startButton.click();

    expect(sernacTranscriber.$el.find(".magnifier").length).toEqual(0);
  });

  it("should update the helper title the launcher after the magnifier is added", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    waits(250);

    runs(function () {
      expect(sernacTranscriber.helper.$title.text()).toEqual("Record code");
    });

  });

  it("should hide the launcher after the magnifier is added", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    expect(sernacTranscriber.launcher.model.get("hidden")).toEqual(true);
  });

  it("should set the currentRecord to zero on init", function() {
    expect(sernacTranscriber.model.get("currentRecord")).toEqual(0);
  });

  it("should set the currentStep to zero when the magnifier is added", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");

    expect(sernacTranscriber.model.get("currentStep")).toEqual(-1);

    sernacTranscriber.addMagnifier();

    expect(sernacTranscriber.model.get("currentStep")).toEqual(0);
  });

  it("should show the sernac transcriber after the magnifier is added", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    expect(sernacTranscriber.transcriberWidget.model.get("hidden")).toEqual(false);
    expect(sernacTranscriber.$el.find(".sernac-widget").length).toEqual(1);
  });

  it("should add the backdrop after the magnifier is added", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    expect(sernacTranscriber.$el.find(".backdrop").length).toEqual(1);
  });

  it("should show the helper after the magnifier is added", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    expect(sernacTranscriber.helper.model.get("hidden")).toEqual(false);
    expect(sernacTranscriber.$el.find(".helper").length).toEqual(1);
  });

  it("should allow to start an annotation", function() {
    expect(sernacTranscriber.startTranscribing()).toEqual(null);
  });

  it("should show the launcher after the transcriber has started", function() {
    expect(sernacTranscriber.startTranscribing()).toEqual(null);
    expect(sernacTranscriber.launcher.model.get("hidden")).toEqual(false);
  });

  it("should have a reference to the launcher", function() {
    expect(sernacTranscriber.launcher.parent).toEqual(sernacTranscriber);
  });

  it("should return the dimensions and the position of the selection", function() {

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");

    expect(sernacTranscriber.selection.getDimensions()).toEqual({ x: 10, y: 10, w: 90, h: 90 });

  });

  it("should show the step information", function() {
    sernacTranscriber.model.set("stepsCount", 10);
    sernacTranscriber.model.set("currentStep", 5);

    expect(sernacTranscriber.transcriberWidget.$step.text()).toEqual("6/10");

    sernacTranscriber.model.set("currentStep", 2);
    expect(sernacTranscriber.transcriberWidget.$step.text()).toEqual("3/10");

  });

  it("should allow to increase the record counter", function() {

    sernacTranscriber.model.set("currentRecord", 3);
    sernacTranscriber.nextRecord();

    expect(sernacTranscriber.model.get("currentRecord")).toEqual(4);

  });

  it("should change the record counter in the status bar when updating the currentRecord", function() {

    sernacTranscriber.model.set("currentRecord", 3);
    sernacTranscriber.nextRecord();

    expect(sernacTranscriber.model.get("currentRecord")).toEqual(4);
    expect(sernacTranscriber.statusBar.$counter.text()).toEqual("4");

  });

  it("should allow to decrease the record counter", function() {
    sernacTranscriber.model.set("currentRecord", 3);
    sernacTranscriber.previousRecord();

    expect(sernacTranscriber.model.get("currentRecord")).toEqual(2);
  });

  it("should allow to increase the step counter", function() {
    sernacTranscriber.model.set("stepsCount", 10);
    sernacTranscriber.model.set("currentStep", 5);

    sernacTranscriber.nextStep();

    expect(sernacTranscriber.model.get("currentStep")).toEqual(6);
  });

  it("should allow to decrease the step counter", function() {
    sernacTranscriber.model.set("stepsCount", 10);
    sernacTranscriber.model.set("currentStep", 5);

    sernacTranscriber.previousStep();

    expect(sernacTranscriber.model.get("currentStep")).toEqual(4);
  });

  it("should return back to zero after the next step", function() {
    sernacTranscriber.model.set("stepsCount", 5);
    sernacTranscriber.model.set("currentStep", 5);

    sernacTranscriber.nextStep();

    expect(sernacTranscriber.model.get("currentStep")).toEqual(0);
  });

  it("should go to the last step", function() {
    sernacTranscriber.model.set("stepsCount", 5);
    sernacTranscriber.model.set("currentStep", 0);

    sernacTranscriber.previousStep();

    expect(sernacTranscriber.model.get("currentStep")).toEqual(5);
  });

  it("should return the width of the input field", function() {

    sernacTranscriber.model.set("currentStep", 0);

    expect(sernacTranscriber.transcriberWidget.model.get("inputWidth")).toEqual(540);
  });

  it("should update the class of the widget when the step changes", function() {

    sernacTranscriber.model.set("currentStep", 2);
    expect(sernacTranscriber.transcriberWidget.$el.find(".input_field").hasClass("location")).toEqual(true);
    expect(sernacTranscriber.transcriberWidget.$el.find(".input_field").hasClass("date")).not.toEqual(true);

    sernacTranscriber.nextStep();
    expect(sernacTranscriber.transcriberWidget.$el.find(".input_field").hasClass("date")).toEqual(true);
    expect(sernacTranscriber.transcriberWidget.$el.find(".input_field").hasClass("text")).not.toEqual(true);

  });

  it("should update the type of input field when the step changes", function() {

    sernacTranscriber.model.set("currentStep", 2);
    expect(sernacTranscriber.transcriberWidget.model.get("type")).toEqual("location");

    sernacTranscriber.nextStep();
    expect(sernacTranscriber.transcriberWidget.model.get("type")).toEqual("date");

  });

  it("should update the placeholder in the widget when the step changes", function() {

    sernacTranscriber.model.set("currentStep", 0);
    sernacTranscriber.nextStep();

    expect(sernacTranscriber.transcriberWidget.$input.attr("placeholder")).toEqual("Species");
  });

  it("should have a link to see an example", function() {

    sernacTranscriber.model.set("currentStep", 0);

    waits(450);

    runs(function() {
      expect(sernacTranscriber.helper.$exampleLink.text()).toEqual("See example");
      expect(sernacTranscriber.helper.$el.find('.example').length).toEqual(1);
    });


  });

  it("should change the title in the helper when the step changes", function() {

    sernacTranscriber.model.set("currentStep", 0);

    sernacTranscriber.nextStep();

    waits(450);

    runs(function() {
      expect(sernacTranscriber.helper.$el.find(".title").text()).toEqual("Genus & species");
      expect(sernacTranscriber.helper.$el.find(".description").text()).toEqual("2 or 3 latin words in the first line, next to the margin. See example");

      sernacTranscriber.previousStep();

      waits(450);

      runs(function() {
        expect(sernacTranscriber.helper.$el.find(".title").text()).toEqual("Record code");
        expect(sernacTranscriber.helper.$el.find(".description").text()).toEqual("It's a 4 digit number located at the top right of the page. See example");
      });
    });

  });

  it("should save a transcription when the $okButton is clicked", function() {

    sernacTranscriber.model.set("currentStep", 0);
    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.launcher.$startButton.removeClass("disabled");

    sernacTranscriber.transcriberWidget.$input.val("Hi!");
    sernacTranscriber.transcriberWidget.$okButton.click();

    expect(sernacTranscriber.transcriptions.length).toEqual(1);
    expect(sernacTranscriber.transcriptions.at(0).get("value")).toEqual("Hi!");

  });

  it("should override a transcription", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.launcher.$startButton.removeClass("disabled");

    sernacTranscriber.model.set("currentStep", 0);

    sernacTranscriber.transcriberWidget.$input.val("Helo");
    sernacTranscriber.transcriberWidget.$okButton.click();

    sernacTranscriber.model.set("currentStep", 0);

    sernacTranscriber.transcriberWidget.$input.val("Hello");
    sernacTranscriber.transcriberWidget.$okButton.click();

    expect(sernacTranscriber.transcriptions.length).toEqual(1);
    expect(sernacTranscriber.transcriptions.at(0).get("value")).toEqual("Hello");

  });

  it("should clean the input field when the $okButton is clicked", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.launcher.$startButton.removeClass("disabled");

    sernacTranscriber.transcriberWidget.$input.val("Hi!");
    sernacTranscriber.transcriberWidget.$okButton.click();

    expect(sernacTranscriber.transcriberWidget.$input.val()).toEqual("");
  });

  it("should move to the next step when $okButton is clicked", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.launcher.$startButton.removeClass("disabled");
    sernacTranscriber.launcher.$startButton.click();

    sernacTranscriber.transcriberWidget.$okButton.click();

    expect(sernacTranscriber.model.get("currentStep")).toEqual(1);
  });

});


/*
* common.ui.view.Transcriber
*
*/
describe("common.ui.view.Transcriber", function() {

  var
  transcriber,
  sernacTranscriber;

  beforeEach(function() {

    transcriber = new nfn.ui.view.Transcriber({
      model: new nfn.ui.model.Transcriber(),
      widgetTemplate: "<strong>hola</strong>"
    });

    sernacTranscriber = new nfn.ui.view.SernacTranscriber({
      model: new nfn.ui.model.Sernac(),
      widgetTemplate: "<strong>hola</strong>"
    });

  });

  afterEach(function() {

    transcriber.clean();
    sernacTranscriber.clean();

  });

  it("should have a log", function() {
    expect(transcriber.transcriptions).toBeDefined();
  });

  it("should have a collection of photos", function() {
    expect(transcriber.photos).toBeDefined();
  });

  it("should allow to add photos", function() {

    var
    photo1 = new nfn.ui.model.Photo();
    photo2 = new nfn.ui.model.Photo();
    photo3 = new nfn.ui.model.Photo();

    transcriber.photos.push(photo1);
    transcriber.photos.push(photo2);
    transcriber.photos.push(photo3);

    expect(transcriber.photos.length).toEqual(3);

  });

  it("should return the type of the transcriber", function() {

    expect(transcriber.model.get("type")).toEqual("default");
    expect(sernacTranscriber.model.get("type")).toEqual("sernac");

  });

  it("should have the right class for each transcriber type", function() {

    expect(transcriber.$el.hasClass('default')).toEqual(true);
    expect(sernacTranscriber.$el.hasClass('sernac')).toEqual(true);

  });

  it("should create a placeholder for the photos", function() {

    expect(transcriber.$el.find(".photos").length).toEqual(1);

  });

  it("should allow to load a photo", function() {

    var url = "http://24.media.tumblr.com/tumblr_m98dbeEnhw1reyyato1_1280.png";
    transcriber.addPhoto(url);
    expect(transcriber.photos.length).toEqual(1);
  });

  it("should append a photo to .photos", function() {

    sernacTranscriber.addPhoto("http://nfn.s3.amazonaws.com/transcriber_sernac_01.png");
    sernacTranscriber.addPhoto("http://nfn.s3.amazonaws.com/transcriber_sernac_02.png");

    sernacTranscriber.showPhoto(0);

    waits(5100);

    runs(function() {
      expect(sernacTranscriber.$el.find("img").length).toEqual(1);
    });

  });

  it("should add and show a photo", function() {

    var url  = "http://nfn.s3.amazonaws.com/transcriber_sernac_01.png";

    sernacTranscriber.loadPhoto(url);

    waits(5000);

    runs(function() {
      expect(sernacTranscriber.$el.find("img").length).toEqual(1);
      expect(sernacTranscriber.$el.find("img").attr("src")).toEqual(url);
    });

  });

  it("should append another photo", function() {

    var url  = "http://nfn.s3.amazonaws.com/transcriber_sernac_01.png";
    var url2 = "http://nfn.s3.amazonaws.com/transcriber_sernac_02.png";

    sernacTranscriber.addPhoto(url);
    sernacTranscriber.addPhoto(url2);

    sernacTranscriber.showPhoto(0);

    waits(5000);

    runs(function() {
      expect(sernacTranscriber.$el.find("img").length).toEqual(1);
      expect(sernacTranscriber.$el.find("img").attr("src")).toEqual(url);

      sernacTranscriber.showPhoto(1);

      waits(5000);

      runs(function() {
        expect(sernacTranscriber.$el.find("img").length).toEqual(1);
        expect(sernacTranscriber.$el.find("img").attr("src")).toEqual(url2);
        expect(sernacTranscriber.$el.find("img").attr("src")).not.toEqual(url);
      });

    });

  });

  it("should hide the magnifier, helper, transcriber and backdrop when the user cliks in the finish button", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    sernacTranscriber.transcriberWidget.$finishButton.click();

    waits(500);

    runs(function() {
      expect(sernacTranscriber.backdrop.model.get("hidden")).toEqual(true);
      expect(sernacTranscriber.helper.model.get("hidden")).toEqual(true);
      expect(sernacTranscriber.magnifier.model.get("hidden")).toEqual(true);
      expect(sernacTranscriber.transcriberWidget.model.get("hidden")).toEqual(true);
    });

  });

  it("should increase the record number", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    sernacTranscriber.transcriberWidget.$finishButton.click();

    expect(sernacTranscriber.model.get("currentRecord")).toEqual(1);

  });

  it("should close the tooltip when the user press the esc key", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    sernacTranscriber.transcriberWidget.$skip.click();

    $(document).trigger({ type: 'keyup', which: "27" });

    expect(sernacTranscriber.transcriberWidget.$el.find(".tooltip").length).toEqual(0);
    expect(sernacTranscriber.transcriberWidget.tooltip).not.toBeDefined();

  });

  it("should create a tooltip when the user cliks in the skip button", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    sernacTranscriber.transcriberWidget.$skip.click();

    expect(sernacTranscriber.transcriberWidget.$el.find(".tooltip").length).toEqual(1);
    expect(sernacTranscriber.transcriberWidget.tooltip.model.get("hidden")).toEqual(false);

  });

  it("shouldn't create another tooltip when the user cliks in the skip button for the second time", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    sernacTranscriber.transcriberWidget.$skip.click();
    sernacTranscriber.transcriberWidget.$skip.click();

    expect(sernacTranscriber.transcriberWidget.$el.find(".tooltip").length).toEqual(1);

  });

  it("should close the tooltip when the user clicks in the close button (secondary)", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    sernacTranscriber.transcriberWidget.$skip.click();
    sernacTranscriber.transcriberWidget.tooltip.$secondaryButton.click();

    expect(sernacTranscriber.transcriberWidget.$el.find(".tooltip").length).toEqual(0);
    expect(sernacTranscriber.transcriberWidget.tooltip).not.toBeDefined();

  });

  it("should skip the field when the user clicks in the skip button (main) of the tooltip", function() {

    sernacTranscriber.$el.find(".photos").append("<img />");
    sernacTranscriber.model.set("currentStep", 0);

    sernacTranscriber.addSelection();
    sernacTranscriber.updateSelection(10, 10, 100, 100);
    sernacTranscriber.selection.$el.css("position", "absolute");
    sernacTranscriber.addMagnifier();

    sernacTranscriber.transcriberWidget.$skip.click();
    sernacTranscriber.transcriberWidget.tooltip.$mainButton.click();

    expect(sernacTranscriber.model.get("currentStep")).toEqual(1);

  });

});

/*
 * common.ui.view.Selector
 *
 */
describe("common.ui.view.Selector", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.Selection({
      model: new nfn.ui.model.Selection(),
      template: $("#selector-template").html()
    });

  });

  afterEach(function() {
    widget.clean();
  });

  it("should have a clear method", function() {
    widget.render();
    widget.setPosition(300, 200);
    widget.setSize(300, 200);
    widget.$el.css("position", "absolute");
    widget.clear();
    expect(widget.isDefined()).toEqual(false);
  });

  it("shouldn't be defined if the dimensions aren't set", function() {
    widget.render();
    widget.setPosition(100, 100);
    expect(widget.isDefined()).toEqual(false);
  });

  it("should be defined if the dimensions are set", function() {
    widget.render();
    widget.setSize(100, 100);
    widget.setPosition(100, 100);
    expect(widget.isDefined()).toEqual(true);
  });

});



/*
 * common.ui.view.Helper
 *
 */
describe("common.ui.view.Helper", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.Helper({
      model: new nfn.ui.model.Helper(),
      template: $("#helper-template").html()
    });

  });

  afterEach(function() {
    widget.clean();
  });

  it("should have a title", function() {
    widget.render();
    expect(widget.$title).toEqual(widget.$el.find(".title"));
    expect(widget.$el.find('.title').length).toEqual(1);
  });

  it("should have a description", function() {
    widget.render();
    expect(widget.$description).toEqual(widget.$el.find(".description"));
    expect(widget.$el.find('.description').length).toEqual(1);
  });

  it("should allow to change the title", function() {
    widget.render();
    widget.model.set("title", "This is a test title");
    expect(widget.$title.text()).toEqual("This is a test title");
  });

  it("should allow to change the description", function() {
    widget.render();
    widget.model.set("description", 'This is a test description <a href="#" data-src="#">See example.</a>');
    expect(widget.$description.html()).toEqual('This is a test description <a href="#" data-src="#">See example.</a>');
  });


  it("should fire a showExample event when the user clicks in the example link", function() {

    widget.render();
    widget.model.set('description', '<a href="#" data-src="http://placehold.it/100x100" class="example">See example</a>');

    var spy = spyOn(widget, 'showExample');

    widget.delegateEvents();

    widget.$exampleLink.click();

    expect(spy).toHaveBeenCalled();

  });

  it("should close the tooltip when the user press the esc key", function() {

    widget.render();
    widget.model.set('description', '<a href="#" data-src="http://placehold.it/100x100" class="example">See example</a>');
    widget.$exampleLink.click();

    $(document).trigger({ type: 'keyup', which: "27" });

    expect(widget.$el.find(".tooltip").length).toEqual(0);
    expect(widget.tooltip).not.toBeDefined();

  });

  it("should create a tooltip when the user cliks in the example link", function() {

    widget.render();
    widget.model.set('description', '<a href="#" data-src="http://placehold.it/100x100" class="example">See example</a>');
    widget.$exampleLink.click();

    expect(widget.$el.find(".tooltip").length).toEqual(1);
    expect(widget.tooltip.model.get("hidden")).toEqual(false);

  });

  it("shouldn't create another tooltip when the user cliks in the example link several times", function() {

    widget.render();
    widget.model.set('description', '<a href="#" data-src="http://placehold.it/100x100" class="example">See example</a>');
    widget.$exampleLink.click();

    expect(widget.$el.find(".tooltip").length).toEqual(1);

  });

  it("should close the tooltip when the user clicks in the close button (secondary)", function() {

    widget.render();
    widget.model.set('description', '<a href="#" data-src="http://placehold.it/100x100" class="example">See example</a>');
    widget.$exampleLink.click();
    widget.$exampleLink.click();

    expect(widget.$el.find(".tooltip").length).toEqual(1);

  });

  it("should load an image inside the tooltip", function() {

    widget.render();
    widget.model.set('description', '<a href="#" data-src="http://placehold.it/100x100" class="example">See example</a>');
    widget.$exampleLink.click();

    expect(widget.$el.find(".tooltip").length).toEqual(1);
    console.log(widget.$el.find(".tooltip img"));
    expect(widget.$el.find(".tooltip img").length).toEqual(1);
    expect(widget.$el.find(".tooltip img").attr("src")).toEqual("http://placehold.it/100x100");

  });

});

/*
 * common.ui.view.SernacWidget
 *
 */
describe("common.ui.view.SernacWidget", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.SernacWidget({
      model: new nfn.ui.model.SernacWidget(),
      template: $("#transcriber-widget-template").html()
    });

  });

  afterEach(function() {
    widget.clean();
  });

  it("should have an ok button", function() {
    widget.render();
    expect(widget.$okButton).toEqual(widget.$el.find(".button.ok"));
    expect(widget.$el.find('.button.ok').length).toEqual(1);
  });

  it("should have a skip link", function() {
    widget.render();
    expect(widget.$skip).toEqual(widget.$el.find(".skip"));
    expect(widget.$el.find('.skip').length).toEqual(1);
  });

  it("should have an input field", function() {
    widget.render();
    expect(widget.$input).toEqual(widget.$el.find('.input_field input[type="text"]'));
    expect(widget.$el.find('.input_field input[type="text"]').length).toEqual(1);
  });

  it("should clear the value of the text input field", function() {
    widget.render();
    widget.model.set("type", "text");
    widget.$input.val('hola');

    expect(widget.getValue()).toEqual("hola");

    widget.clearInput();
    expect(widget.getValue()).toEqual("");
  });

  it("should clear the value of the date input field", function() {
    widget.render();
    widget.model.set("type", "date");
    widget.$el.find(".month").val('2');
    widget.$el.find(".day").val('1');
    widget.$el.find(".year").val('2012');

    expect(widget.getValue()).toEqual("2/1/2012");

    widget.clearInput();
    expect(widget.getValue()).toEqual("");
  });

  it("should return the value of the text input field", function() {
    widget.render();
    widget.model.set("type", "text");
    widget.$input.val('hola');

    expect(widget.getValue()).toEqual("hola");
  });

  it("should return the value of the date input field", function() {
    widget.render();
    widget.model.set("type", "date");
    widget.$el.find(".month").val('2');
    widget.$el.find(".day").val('1');
    widget.$el.find(".year").val('2012');

    expect(widget.getValue()).toEqual("2/1/2012");
  });

  it("should have a step counter", function() {
    widget.render();
    expect(widget.$step).toEqual(widget.$el.find('.step'));
    expect(widget.$el.find(".step").length).toEqual(1);
  });

  it("should have a button to finish the record", function() {
    widget.render();
    expect(widget.$finishButton).toEqual(widget.$el.find('.button.finish'));
    expect(widget.$el.find(".button.finish").length).toEqual(1);
  });

  it("should fire an event when the user clicks in the ok button", function() {
    widget.render();

    var spy = spyOn(widget, 'ok');

    widget.delegateEvents();
    widget.$okButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it("should fire an event when the user clicks in the skip button", function() {

    widget.render();

    var spy = spyOn(widget, 'showSkipPane');

    widget.delegateEvents();
    widget.$skip.click();

    expect(spy).toHaveBeenCalled();
  });

  it("should fire an event when the user clicks in the finish button", function() {

    widget.render();

    var spy = spyOn(widget, 'finish');

    widget.delegateEvents();
    widget.$finishButton.click();

    expect(spy).toHaveBeenCalled();
  });

});

/*
 * common.ui.view.Launcher
 *
 */
describe("common.ui.view.Launcher", function() {

  var widget;

  beforeEach(function() {

    widget = new nfn.ui.view.Launcher({
      model: new nfn.ui.model.Launcher(),
      template: $("#launcher-template").html()
    });
  });

  afterEach(function() {
    widget.clean();
  });

  it("should have a $startButton", function() {
    widget.render();
    expect(widget.$startButton).toEqual(widget.$el.find(".button.start"));
  });

  it("should have a message", function() {
    widget.render();
    expect(widget.$message).toEqual(widget.$el.find("span"));
    expect(widget.$message.text()).toEqual("Drag a square around the specimen label");
  });

  it("should have a link to see an example", function() {
    widget.render();
    expect(widget.$exampleLink).toEqual(widget.$el.find(".example"));
    expect(widget.$exampleLink.text()).toEqual("See example");
    expect(widget.$el.find('.example').length).toEqual(1);
  });

  it("should allow to enable the button", function() {
    widget.render();
    widget.enable();
    expect(widget.$startButton.hasClass("disabled")).toEqual(false);
  });

  it("should allow to disable the button", function() {
    widget.render();

    widget.disable();
    expect(widget.$startButton.hasClass("disabled")).toEqual(true);

  });

  it("should fire a start event when the user clicks in the start button", function() {

    widget.render();

    var spy = spyOn(widget, 'start');

    widget.delegateEvents();

    widget.$startButton.click();

    expect(spy).toHaveBeenCalled();

  });

  it("should fire a showExample event when the user clicks in the example link", function() {

    widget.render();

    var spy = spyOn(widget, 'showExample');

    widget.delegateEvents();

    widget.$exampleLink.click();

    expect(spy).toHaveBeenCalled();

  });

  it("should close the tooltip when the user press the esc key", function() {

    widget.render();
    widget.$exampleLink.click();

    $(document).trigger({ type: 'keyup', which: "27" });

    expect(widget.$el.find(".tooltip").length).toEqual(0);
    expect(widget.tooltip).not.toBeDefined();

  });

  it("should create a tooltip when the user cliks in the example link", function() {

    widget.render();
    widget.$exampleLink.click();

    expect(widget.$el.find(".tooltip").length).toEqual(1);
    expect(widget.tooltip.model.get("hidden")).toEqual(false);

  });

  it("shouldn't create another tooltip when the user cliks in the example link several times", function() {

    widget.render();
    widget.$exampleLink.click();
    widget.$exampleLink.click();

    expect(widget.$el.find(".tooltip").length).toEqual(1);

  });

  it("should close the tooltip when the user clicks in the close button (main)", function() {

    widget.render();
    widget.$exampleLink.click();
    widget.tooltip.$mainButton.click();

    expect(widget.$el.find(".tooltip").length).toEqual(0);
    expect(widget.tooltip).not.toBeDefined();

  });


});


