(function($){
	$(document).ready(function(){
		// ------------------------
		// Init
		// ------------------------
		
		if(!$('.jnilla-form').length) return;
		
		var jqFormContainer = $('<div class="jnilla-form-container">');
		var jqFormOptions = $(
			'<div class="jnilla-form-options jnilla-form-form-options">'+
			'	<div style="font-weight: bold">Jnilla Form (Edit Mode)</div>'+
			'</div>'
		);
		var jqFormItemOptions = $(
			'<div class="jnilla-form-options jnilla-form-item-options hidden">'+
			'	<div class="clearfix" style="margin-bottom: 10px">'+
			'		<div class="jnilla-form-action-add btn btn-mini" title="Add Item"><i class="icon-plus"></i></div>'+
			'		<div class="jnilla-form-action-remove btn btn-mini" title="Remove Item"><i class="icon-trash"></i></div>'+
			'		<div class="jnilla-form-action-move-up btn btn-mini" title="Move Item Up"><i class="icon-arrow-up"></i></div>'+
			'		<div class="jnilla-form-action-move-down btn btn-mini" title="Move Item Down"><i class="icon-arrow-down"></i></div>'+
			'		<div class="jnilla-form-action-close btn btn-mini pull-right" title="Close Item Options"><i class="icon-remove"></i></div>'+
			'	</div>'+
			'	<div style="font-weight: bold">Item Options</div>'+
			'	<label>Text:</label>'+
			'	<textarea class="jnilla-form-option-text" rows="2"></textarea>'+
			'	<label>Value:</label>'+
			'	<textarea class="jnilla-form-option-value" rows="2"></textarea>'+
			'	<label>Items:</label>'+
			'	<textarea class="jnilla-form-option-items" rows="2"></textarea>'+
			'	<label>Id:</label>'+
			'	<input type="text"  class="jnilla-form-option-id">'+
			'	<label>Triggers:</label>'+
			'	<textarea class="jnilla-form-option-triggers" rows="2"></textarea>'+
			'	<label>Metadata:</label>'+
			'	<textarea class="jnilla-form-option-metadata" rows="2"></textarea>'+
			'	<label>Type:</label>'+
			'	<select class="jnilla-form-option-type">'+
			'		<option value="text">Text</option>'+
			'		<option value="textarea">Textarea</option>'+
			'		<option value="select">Select</option>'+
			'		<option value="radio">Radio</option>'+
			'	</select>'+
			'</div>'
		);
		var jqFormItem = $(
			'<div class="jnilla-form-item">'+
			'	<div class="jnilla-form-item-text"></div>'+
			'	<div class="jnilla-form-item-input"></div>'+
			'</div>'
		);
		var jqCurrentFormItem;
		var flags = [];

		// Set flags
		flags['form-item-options-exist'] = false;

		// Form item types
		var formItemTypes = {
			// Text item
			text : {
				// Create item
				create : function(formItemData){
					var jqFormItemClone = jqFormItem.clone();
					var jqFormItemText = jqFormItemClone.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItemClone.find('.jnilla-form-item-input').eq(0);
					
					// Set default data
					if((typeof formItemData === 'undefined') || (formItemData === '')){
						formItemData = {
							"text":"Set text here",
							"value":"Set value here",
						}
					}
					formItemData.type = 'text';
					
					// Store item data
					jqFormItemClone.data('formItemData', formItemData);

					// Add parts
					var jqTextInput = $('<input type="text" />');
					jqFormItemInput.append(jqTextInput);

					// Return reference
					return jqFormItemClone;
				},
				
				// Update item GUI
				updateGui : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemText = jqFormItem.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input').eq(0);
					
					// Set text
					jqFormItemText.html(formItemData.text);
					
					// Set value
					jqFormItemInput.find('input').val(formItemData.value);
					
					// Set id
					jqFormItem.attr('id', formItemData.id);
				},

				// Update the data object reading the input values
				updateData : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input');

					// Get input value
					formItemData.value = jqFormItemInput.find('input').val();
					
					// Store data
					jqFormItem.data('formItemData', formItemData);
				},
			},
			// Text area item
			textarea : {
				// Create item
				create : function(formItemData){
					var jqFormItemClone = jqFormItem.clone();
					var jqFormItemText = jqFormItemClone.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItemClone.find('.jnilla-form-item-input').eq(0);
					
					// Set default data
					if((typeof formItemData === 'undefined') || (formItemData === '')){
						formItemData = {
							"text":"Set text here",
							"value":"Set value here"
						}
					}
					formItemData.type = 'textarea';
					
					// Store item data
					jqFormItemClone.data('formItemData', formItemData);
					
					// Add parts
					var jqTextarea = $('<textarea></textarea>');
					jqFormItemInput.append(jqTextarea);

					// Return reference
					return jqFormItemClone;
				},
				
				// Update item GUI
				updateGui : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemText = jqFormItem.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input').eq(0);
					
					// Set text
					jqFormItemText.html(formItemData.text);
					
					// Set value
					jqFormItemInput.find('textarea').val(formItemData.value);
					
					// Set id
					jqFormItem.attr('id', formItemData.id);
				},

				// Update the data object reading the input values
				updateData : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input');

					// Get input value
					formItemData.value = jqFormItemInput.find('textarea').val();
					
					// Store data
					jqFormItem.data('formItemData', formItemData);
				},
			},
			
			// Select item
			select : {
				// Create item
				create : function(formItemData){
					var jqFormItemClone = jqFormItem.clone();
					var jqFormItemText = jqFormItemClone.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItemClone.find('.jnilla-form-item-input').eq(0);
					
					// Set default data
					if((typeof formItemData === 'undefined') || (formItemData === '')){
						formItemData = {
							"text":"Set text here",
						}
					}
					if((typeof formItemData.items === 'undefined') || (formItemData.items === '')){
						formItemData.items = "Item 1\nItem 2\nItem 3";
						formItemData.value = "Item 1"
					}
					formItemData.type = 'select';
					
					// Store item data
					jqFormItemClone.data('formItemData', formItemData);
					
					// Add parts
					var jqSelect = $('<select></select>');
					jqFormItemInput.append(jqSelect);
					
					// Return reference
					return jqFormItemClone;
				},
				
				// Update item GUI
				updateGui : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemText = jqFormItem.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input').eq(0);
					
					// Set text
					jqFormItemText.html(formItemData.text);
					
					// Set value
					var jqSelect = jqFormItemInput.find('select');
					jqSelect.html('');
					var items = formItemData.items;
					items = items.split("\n");
					for(var item in items){
						item = items[item];
						var jqOption = $('<option></option>');
						jqOption
							.html(item)
							.attr('value', item);
						jqSelect.append(jqOption);
					}
					jqSelect.val(formItemData.value);
					
					// Set id
					jqFormItem.attr('id', formItemData.id);
				},
				
				// Update the data object reading the input values
				updateData : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input');

					// Get input value
					formItemData.value = jqFormItemInput.find('select').val();
					
					// Store data
					jqFormItem.data('formItemData', formItemData);
				},
			},
			
			// Radio item
			radio : {
				// Create item
				create : function(formItemData){
					var jqFormItemClone = jqFormItem.clone();
					var jqFormItemText = jqFormItemClone.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItemClone.find('.jnilla-form-item-input').eq(0);
					
					// Set default data
					if((typeof formItemData === 'undefined') || (formItemData === '')){
						formItemData = {
							"text":"Set text here",
						}
					}
					if((typeof formItemData.items === 'undefined') || (formItemData.items === '')){
						formItemData.items = "Item 1\nItem 2\nItem 3";
						formItemData.value = "Item 1"
					}
					formItemData.type = 'radio';
					
					// Store item data
					jqFormItemClone.data('formItemData', formItemData);
					
					// Add parts
					// none
					
					// Return reference
					return jqFormItemClone;
				},
				
				// Update item GUI
				updateGui : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemText = jqFormItem.find('.jnilla-form-item-text').eq(0);
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input').eq(0);
					
					// Set text
					jqFormItemText.html(formItemData.text);
					
					// Define automatic name
					var index = $('.jnilla-form-item').index(jqFormItem);
					var name = 'jnilla-form-radio-'+index;
					
					// Set value
					jqFormItemInput.html('');
					var items = formItemData.items;
					items = items.split("\n");
					for(var item in items){
						item = items[item];
						var jqRadio;
						var checked = '';
						var id = name+'-'+(jqFormItemInput.find('input').length+1);
						if(formItemData.value === item) checked = 'checked';
						jqRadio = $('<label for="'+id+'"><input type="radio" name="'+name+'" id="'+id+'" value="'+item+'" '+checked+'> '+item+'</label>');
						jqFormItemInput.append(jqRadio);
					}
					
					// Set id
					jqFormItem.attr('id', formItemData.id);
				},
				
				// Update the data object reading the input values
				updateData : function(jqFormItem){
					var formItemData = jqFormItem.data('formItemData');
					var jqFormItemInput = jqFormItem.find('.jnilla-form-item-input');

					// Get input value
					formItemData.value = jqFormItemInput.find('input:checked').val();
					
					// Store data
					jqFormItem.data('formItemData', formItemData);
				},
			},
			
		}
		
		// Create forms
		createForms();
		
		// Process triggers
		processTriggers();
		
		// Update main inputs
		updateFormsMainInputs();
		
		// ------------------------
		// Events
		// ------------------------

		
		// Form item options events (edit mode)
		$(document).on('click keyup change blur', '.jnilla-form-edit.jnilla-form-container .jnilla-form-item-options *', function(event){
			// Debounce
			if(flags['form-item-options-triggered-event']) return;
			flags['form-item-options-triggered-event'] = true;
			setTimeout(function(){
				flags['form-item-options-triggered-event'] = false;
			},50);
			
			if(jqCurrentFormItem === '') return;
			
			var formItemData = jqCurrentFormItem.data('formItemData');
			var formItemType;
			
			// Item data
			
			// Field: Text
			formItemData.text = jqFormItemOptions.find('.jnilla-form-option-text').val();
			
			// Field: Value
			formItemData.value = jqFormItemOptions.find('.jnilla-form-option-value').val();
			
			// Field: Items
			formItemData.items = jqFormItemOptions.find('.jnilla-form-option-items').val();
			
			// Field: Id
			formItemData.id = jqFormItemOptions.find('.jnilla-form-option-id').val();
			
			// Field: Triggers
			formItemData.triggers = jqFormItemOptions.find('.jnilla-form-option-triggers').val();
			
			// Field: Metadata
			formItemData.metadata = jqFormItemOptions.find('.jnilla-form-option-metadata').val();
			
			// Check if type was modified
			formItemType = jqFormItemOptions.find('.jnilla-form-option-type').val();
			if(formItemData.type !== formItemType){
				var jqFormContainer = jqCurrentFormItem.closest('.jnilla-form-container');
				var jqNewFormItem = formItemTypes[formItemType].create(formItemData);
				jqCurrentFormItem.after(jqNewFormItem);
				jqCurrentFormItem.remove();
				jqCurrentFormItem = jqNewFormItem;
				jqFormItemOptions.addClass('hidden');
				//populateFormItemOptions();
			}
			
			// Store changes
			jqCurrentFormItem.data('formItemData', formItemData);
			
			// Update GUI
			updateFormsGui();
			
			// Update forms main inputs
			updateFormsMainInputs();
		});
		
		// Form item click (edit mode)
		$(document).on('click', '.jnilla-form-edit.jnilla-form-container .jnilla-form-item', function(){
			jqCurrentFormItem = $(this);
			var formItemData = jqCurrentFormItem.data('formItemData');
			
			// Move form item options to selected form item
			jqCurrentFormItem.after(jqFormItemOptions);
			jqFormItemOptions.removeClass('hidden');
			
			// Update fields
			
			// Field: Text
			jqFormItemOptions.find('.jnilla-form-option-text').val(formItemData.text);
			
			// Field: Value 
			jqFormItemOptions.find('.jnilla-form-option-value').val(formItemData.value);
			
			// Field: Items 
			jqFormItemOptions.find('.jnilla-form-option-items').val(formItemData.items);
			
			// Field: id 
			jqFormItemOptions.find('.jnilla-form-option-id').val(formItemData.id);
			
			// Field: Triggers
			jqFormItemOptions.find('.jnilla-form-option-triggers').val(formItemData.triggers);
			
			// Field: Metadata
			jqFormItemOptions.find('.jnilla-form-option-metadata').val(formItemData.metadata);
			
			// Field: Item type
			jqFormItemOptions.find('.jnilla-form-option-type').val(formItemData.type);
		});
		
		// Form item options close button click (edit mode)
		$(document).on('click', '.jnilla-form-container .jnilla-form-action-close', function(){
			jqFormItemOptions.addClass('hidden');
		});
		
		// Form item options remove button click (edit mode)
		$(document).on('click', '.jnilla-form-edit.jnilla-form-container .jnilla-form-action-remove', function(){
			var formItemsCount = $(this).closest('.jnilla-form-container').find('.jnilla-form-item').length;
			if(formItemsCount > 1){
				jqCurrentFormItem.remove();
				jqCurrentFormItem = '';
				jqFormItemOptions.addClass('hidden');
			}
		});
		
		// Form item options add button click (edit mode)
		$(document).on('click', '.jnilla-form-edit.jnilla-form-container .jnilla-form-action-add', function(){
			var jqFormContainer = jqCurrentFormItem.closest('.jnilla-form-container');
			var formItemIndex = jqCurrentFormItem.index();
			var jqNewFormItem = formItemTypes.text.create();
			jqCurrentFormItem.after(jqNewFormItem);
			updateFormsGui();
			jqFormItemOptions.addClass('hidden');
		});
		
		// Form item options move up button click (edit mode)
		$(document).on('click', '.jnilla-form-edit.jnilla-form-container .jnilla-form-action-move-up', function(){
			var jqFormContainer = jqCurrentFormItem.closest('.jnilla-form-container');
			var formItemIndex = jqCurrentFormItem.index();
			if(formItemIndex > 1){
				jqFormContainer.find('.jnilla-form-item').eq(formItemIndex-2).before(jqCurrentFormItem);
				jqFormItemOptions.addClass('hidden');
			}
		});
		
		// Form item options move down button click (edit mode)
		$(document).on('click', '.jnilla-form-edit.jnilla-form-container .jnilla-form-action-move-down', function(){
			var jqFormContainer = jqCurrentFormItem.closest('.jnilla-form-container');
			var formItemIndex = jqCurrentFormItem.index();
			var formItemsCount = $(this).closest('.jnilla-form-container').find('.jnilla-form-item').length;
			if(formItemIndex < formItemsCount){
				jqFormContainer.find('.jnilla-form-item').eq(formItemIndex).after(jqCurrentFormItem);
				jqFormItemOptions.addClass('hidden');
			}
		});
		
		// Form item input events (live mode)
		$(document).on('click keyup change blur', '.jnilla-form-container .jnilla-form-item-input *', function(){
			// Debounce
			if(flags['form-item-input-triggered-event']) return;
			flags['form-item-input-triggered-event'] = true;
			setTimeout(function(){
				flags['form-item-input-triggered-event'] = false;
			},50);
			
			var isEditMode = $(this).closest('.jnilla-form-container').hasClass('jnilla-form-edit');
			if(isEditMode) return;
			
			var jqFormItem = $(this).closest('.jnilla-form-item');
			var formItemData = jqFormItem.data('formItemData');
			
			// Update data
			formItemTypes[formItemData.type].updateData(jqFormItem);
			
			// Process triggers
			processTriggers();
			
			// Update forms main inputs
			updateFormsMainInputs();
		});
		
		
		// ------------------------
		// Functions 
		// ------------------------
		
		// Process triggers
		function processTriggers(){
			$('.jnilla-form-container .jnilla-form-item').each(function(){
				var jqFormItem = $(this);
				
				var isEditMode = jqFormItem.closest('.jnilla-form-container').hasClass('jnilla-form-edit');
				if(isEditMode) return;
				
				var formItemData = jqFormItem.data('formItemData');
				if((typeof formItemData.triggers === 'undefined') || (formItemData.triggers === '')){
					// Store trigger state
					formItemData.triggerState = true;
					jqFormItem.data('formItemData', formItemData);
					return;
				}
				
				// Parse triggers data
				var parts = formItemData.triggers.split(':', 2);
				//if(parts.length < 2) return;
				
				var id = parts[0];
				//if(!$('#'+id).length) return;
				
				var values = parts[1].split(',');
				//if(values === '') return;
				
				var value = $('#'+id).data('formItemData').value;
				
				// Apply trigger
				if(values.indexOf(value) > -1){
					jqFormItem.removeClass('hidden');
					formItemData.triggerState = true;
				}else{
					jqFormItem.addClass('hidden');
					formItemData.triggerState = false;
				}

				// Apply dependency trigger
				if($('#'+id).hasClass('hidden')){
					jqFormItem.addClass('hidden');
					formItemData.triggerState = false;
				}
				
				// Store trigger state
				jqFormItem.data('formItemData', formItemData);
				
			});
		}
		
		// Update forms main inputs
		function updateFormsMainInputs(){
			$('.jnilla-form-container').each(function(){
				var jqFormContainer = $(this);
				var jqFormMainInput = jqFormContainer.data('jqFormMainInput');
				var formData = {};
				
				// Store form item data
				formData.items = [];
				jqFormContainer.find('.jnilla-form-item').each(function(){
					var jqFormItem = $(this);
					var formItemData = jqFormItem.data('formItemData');
					formData.items.push(formItemData);
				});
				
				// Store form data
				jqFormContainer.data('formData', formData);
				
				// Update main input value
				formData = JSON.stringify(formData);
				jqFormMainInput.val(formData);
			});
		}
		
		// Update forms GUI
		function updateFormsGui(){
			// Update forms GUI
			//
			
			// Update form items GUI
			$('.jnilla-form-container .jnilla-form-item').each(function(){
				var jqFormItem = $(this);
				var formItemData = jqFormItem.data('formItemData');
				formItemTypes[formItemData.type].updateGui(jqFormItem);
			});
		}
		
		// Create forms
		function createForms(){
			$('.jnilla-form').each(function(){
				var jqFormMainInput = $(this); 
				var isEditMode = jqFormMainInput.hasClass('jnilla-form-edit');
				var jqNewFormItem;

				// Add form container
				var jqFormContainerClone = jqFormContainer.clone();
				if(isEditMode){
					jqFormContainerClone.addClass('jnilla-form-edit');
				}
				// Store reference to it's main input
				jqFormContainerClone.data('jqFormMainInput', jqFormMainInput);
				jqFormMainInput.after(jqFormContainerClone);

				// Add form options
				if(isEditMode){
					var jqFormOptionsClone = jqFormOptions.clone();
					jqFormContainerClone.append(jqFormOptionsClone);
				}

				// Add form item options (Single instance)
				if(isEditMode && !flags['form-item-options-exist']){
					// Add form item options
					jqFormContainerClone.append(jqFormItemOptions);
					flags['form-item-options-exist'] = true;
				}

				// Read main input and parse form data (JSON string)
				var formData = parseJson(jqFormMainInput.val());

				// If form data is invalid creates a default form
				if(!formData){
					formData = {};
					jqNewFormItem = formItemTypes.text.create();
					jqFormContainerClone.append(jqNewFormItem);
				}
				
				// Create form items
				for(var itemIndex in formData.items){
					var formItemData = formData.items[itemIndex];
					jqNewFormItem = formItemTypes[formItemData.type].create();
					// Store form item data
					jqNewFormItem.data('formItemData', formItemData);
					jqFormContainerClone.append(jqNewFormItem);
				}
				
				// Store form data
				jqFormContainerClone.data('formData', formData);
			});
			
			// Update forms GUI
			updateFormsGui();
		}

		// Validate and parse JSON string
		function parseJson(str){
			try{
				return JSON.parse(str);
			}catch(e){
				return false;
			}
		}

	});
})(jQuery);