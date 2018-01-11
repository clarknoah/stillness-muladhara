export var testData = {
  entanglements:[
    {
      current_value: null,
      db_type:'instance_of',
      mandatory_field:true,
      field_order:1,
      is_edittable:true,
      display_name:'Instance Of',
      hint:'Cool',
      source_label:'Meditation_Instance',
      target_label:'Meditation_Type',
      cardinality:'one-to-one',
      current_display:"frank",
      creator:'source',
      updated_value:null
    },
    {
      current_value: null,
      db_type:'best_maps_to',
      mandatory_field:true,
      field_order:1,
      is_edittable:true,
      display_name:'Best Maps To',
      hint:'Cool',
      source_label:'Experience',
      target_label:'Perception',
      cardinality:'one-to-one',
      current_display:null,
      creator:'source',
      updated_value:null
    }
  ],
  qualias:[{
    current_value:null,
    eq_type: "qualia",
    data_type: 'number',
    default_value: 123,
    placeholder: 'Name of Variable',
    qualia_db_name: 'name_of_variable',
    mandatory_field: true,
    field_order: 1,
    is_edittable: true,
    select_options: [],
    display_name: 'Test Number',
    hint: 'Name',
    validators:[]
  },
  {
    current_value:null,
    eq_type: "qualia",
    data_type: 'text',
    default_value: "123",
    placeholder: 'Name of Variable',
    qualia_db_name: 'name_of_variable',
    mandatory_field: true,
    field_order: 1,
    is_edittable: true,
    select_options: [],
    display_name: 'Test String',
    hint: 'Name',
    validators:[]
  }
  ]
}
