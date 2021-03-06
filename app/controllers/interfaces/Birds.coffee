# Api = require 'zooniverse/lib/api'
# User  = require 'zooniverse/lib/models/user'

# data_fields = require 'lib/birds_fields'

# Interfaces = require 'controllers/interfaces'
# Classification = require 'models/Classification'


# $.fn.center = ->
#   @css
#     top: (@parent().height() / 2) - (@height() / 2)
#     left: (@parent().width() / 2) - (@width() / 2)

# $.fn.pixels = (property) ->
#   parseInt(@css(property).slice(0, -2))



# class Field extends Spine.Controller

#   events:
#     'click #done': 'done'
#     'click #next': 'next'

#   constructor: (opts) ->
#     super
#     @id = opts.id if opts?.id?
#     @opField = opts.field if opts?.field?
#     @data = opts.data if opts?.data?

#     @html @template({id: @id, field: @opField})
#     @setValue()
    
#   done: =>
#     @trigger 'done', {name: @opField.name, value: @getValue()}

#   next: =>
#     @trigger 'next', {name: @opField.name, value: @getValue()}

# class MultiField extends Field
#   className: 'field multi'
#   template: require 'views/transcription/interfaces/birds/fields/multi'

#   constructor: (opts) ->
#     throw new Error('Must provide sub fields for MultiField') unless opts.field.sub_fields
#     super

#     opField = @opField
#     @el.find('input, select').each (i) ->
#       $(@).focus ->
#         $(@).removeClass 'focus-text'
#         if $(@).val() is opField.sub_fields[i].helper_text
#           $(@).val ''

#       $(@).blur ->
#         if $(@).val() is ''
#           $(@).addClass 'focus-text'
#           $(@).val opField.sub_fields[i].helper_text

#   getValue: =>
#     data = []
#     opField = @opField

#     console.log 'getting value of multi field', @el, @el.find('input, select')
#     @el.find('input, select').each (i) ->
#       console.log 'field val', $(@).val()
#       if $(@).val() is opField.sub_fields[i].helper_text
#         data.push ''
#       else
#         data.push $(@).val()
#     return data

#   setValue: =>
#     data = @data
#     opField = @opField

#     @el.find('input, select').each (i) ->
#       console.log 'setValue', data, i
#       if data?.data?.value?[i]?
#         console.log 'data exists at i', data.data.value[i]
#         $(@).val data.data.value[i]
#       else
#         $(@).val opField.sub_fields[i].helper_text
#         $(@).addClass 'focus-text'


# class InputField extends Field
#   className: 'field input'
#   template: require 'views/transcription/interfaces/birds/fields/input'

#   elements:
#     '#field': 'field'

#   getValue: =>
#     @field.val()

#   setValue: =>
#     if @data?.data?.value?
#       @field.val @data.data.value
#     else
#       console.log ''

# class FieldBox extends Spine.Controller
#   className: 'field-box'
#   template: require 'views/transcription/interfaces/birds/field_box'

#   elements:
#     'ul': 'fieldList'

#   events:
#     'click li': 'onClickField'

#   constructor: (opts) ->
#     super
#     @html @template({fields: opts.fields})

#     opts.widget.bind 'next', (currentField) =>
#       @fieldList.css
#         top: -(currentField * 60)

#   onClickField: (e) ->
#     @trigger 'select-field', $(e.currentTarget).index()

# class EntryWidget extends Spine.Controller
#   className: 'data-entry'
#   template: require 'views/transcription/interfaces/birds/entry_widget'

#   data: {}

#   elements:
#     '#entity': 'entity'
#     '#helper-box': 'helperBox'

#   @loadFormat: (fields) ->
#     @::fields = fields

#   constructor: (opts) ->
#     super
#     @fields = opts.fields if opts?.fields?

#     @currentField = 0

#     @html @template({fields: @fields})

#     @fieldBox = new FieldBox {fields: @fields, widget: @}
#     @prepend @fieldBox.el

#     @fieldBox.bind 'select-field', (id) =>
#       @currentField = id
#       @renderField()

#   # Public
#   load: (@record) =>
#     @currentField = 0
#     @renderField()

#   start: => @renderField()
#   next: => @saveAndContinue({})
#   destroy: =>
#     @el.fadeOut =>
#       @el.remove()

#   # Private
#   renderField: =>
#     console.log 'Fields:', @fields, @record

#     data = @record?.load(@currentField) || []
#     field = @fields[@currentField]

#     switch field.type
#       when 'input' then FieldType = InputField
#       when 'multi' then FieldType = MultiField

#     console.log 'data im passing into the field', data, field, @id
#     the_field = new FieldType {id: @id, field: field, data: data}
#     the_field.bind 'next done', @saveAndContinue

#     @entity.html the_field.el

#     if field.description
#       @helperBox.html field.description()
#       @helperBox.addClass 'shown'
#     else
#       @helperBox.removeClass 'shown'

#   saveAndContinue: (fieldData) =>
#     @trigger 'data', {id: @id, data: fieldData}
#     @record?.save {id: @currentField, data: fieldData}

#     if field = @fields[@currentField + 1]
#       console.log 'Another field to collect data for!'
#       @currentField += 1
#       @trigger 'next', @currentField
#       @renderField()
#     else
#       console.log 'No more fields.'
#       if @record?.isComplete()
#         console.log 'all fields have valid data.'
#         @trigger 'done'
#       else
#         console.log 'there is a gap somewhere.'
#         @currentField = 0
#         @trigger 'next', @currentField
#         @renderField()

#       @trigger 'done'


# class RowBox extends Spine.Controller
#   className: 'row'
#   tag: 'span'

#   events:
#     'mousedown': 'onStartDrag'

#   constructor: ->
#     super
#     @html ''

#   onStartDrag: (e) =>
#     e.preventDefault()

#     @dragging = true
#     $(document).on 'mouseup.moveRow', @onEndDrag
#     $(document).on 'mousemove.moveRow', (de) =>
#       if @dragging
#         @el.css
#           top: de.pageY - (@el.height() / 2) - 110

#   onEndDrag: (e) =>
#     @dragging = false
#     $(document).off 'mousemove.moveRow mouseup.moveRow'

# class Record extends Spine.Controller
#   @instances: []

#   @resetRecords: =>
#     for record in @instances
#       record.selected = false
#       record.rowBox.el.removeClass 'selected'

#   className: 'record'
#   tag: 'div'

#   events:
#     'click': 'select'

#   constructor: (opts) ->
#     super
#     @constructor.resetRecords()

#     @id = _.uniqueId()
#     @data = []
#     @fields = opts.fields
#     console.log 'record opts', opts

#     @html ''

#     @rowBox = new RowBox
#     @append @rowBox.el

#     @constructor.instances.push @

#     @select()

#   select: =>
#     if @selected
#       console.log 'already selected'
#     else
#       console.log 'Selecting the row.'
#       @constructor.resetRecords()

#       @rowBox.el.addClass 'selected'
#       @selected = true
#       @trigger 'select', @

#   save: (data) =>
#     console.log 'Record: save: data', data
#     for datum in @data when data.id is datum.id
#       datum = data
#       return

#     @data.push data

#   load: (id) =>
#     console.log 'loading data id #', id
#     for datum in @data when id is datum.id
#       console.log 'datum', datum
#       return datum

#     console.log 'no data found'
#     return []

#   remove: =>
#     for r, i in @constructor.instances when r.id is @id
#       @constructor.instances.splice i, 1

#   isComplete: =>
#     completedData = []

#     for datum in @data
#       completed = true
#       if Array.isArray datum.data.value
#         for value in datum.data.value
#           if value is '' then completed = false
#       else
#         if datum.data.value is '' then completed = false

#       if completed then completedData.push datum

#     # if completedData.length is @fields.length then return true else return false
#     if completedData.length is @fields.length
#       return true
#     else
#       return false


# class Birds extends Interfaces
#   className: 'birds-interface'
#   template: require 'views/transcription/interfaces/birds'

#   records: []

#   elements:
#     '#buttons': 'buttons'
#     '#entry-widget': 'entryWidget'
#     '#images': 'images'
#     '#rows': 'rows'
#     '#transcription-area': 'workspace'

#   events:
#     'click #new-row': 'onCreateNewRow'
#     'click #finish': 'finish'
#     'click #power': 'exit'

#   constructor: ->
#     super

#   startWorkflow: (@archive) =>
#     @render({archive: @archive, preferences: @preferences})

#     @delay =>
#       @workspace.height ($(window).height() - @workspace.pixels('margin-top'))
#       @nextSubject()

#   nextSubject: =>
#     loadingIndicator = new Spinner({color: '#fff', shadow: true, width: 4}).spin(document.getElementsByClassName(@className)[0])

#     @archive.nextSubject (@currentSubject) =>
#       @classification = new Classification

#       for type, source of @currentSubject.location
#         img = new Image
#         img.src = source
#         img.id = type

#         @images.append img

#       # subject will have type of record on it. For now, pick one
#       EntryWidget.loadFormat [{name: 'page_number', type: 'input'}]

#       @images.imagesLoaded =>
#         loadingIndicator.stop()
#         corner = document.getElementById 'corner'
#         $(corner).center().show()

#         # Get page number
#         numberWidget = new EntryWidget
#         numberWidget.el.appendTo @workspace
#         numberWidget.start()

#         numberWidget.bind 'data', (annotation) =>
#           console.log 'Adding classification'
#           @classification.addAnnotation annotation

#         numberWidget.bind 'done', =>
#           console.log 'Collected data for all fields in the format.'
#           numberWidget.destroy()

#           corner = document.getElementById 'corner'
#           page = document.getElementById 'page'

#           $(corner).hide()
#           $(page).show()
#           @buttons.fadeIn()

#           @pageWidget = new EntryWidget {fields: data_fields.new_format}
#           @pageWidget.el.appendTo @workspace

#   finish: =>
#     for record in @records
#       @classification.addAnnotation record.data

#     @classification.send()
#     @reset()
#     @nextSubject()

#   reset: =>
#     @buttons.fadeOut()
#     @images.empty()

#     record.unbind() for record in @records
#     @records = []

#   # Events
#   onCreateNewRow: (e) =>
#     record = new Record {fields: @pageWidget.fields}
#     record.el.appendTo @rows
#     @records.push record

#     @pageWidget.load record

#     record.bind 'select', =>
#       console.log 'record', record, @
#       @pageWidget.load record

#     record.trigger 'start'

#   onFinish: (e) =>
#     @finish()



# module.exports = Birds