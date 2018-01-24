// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 3},
    {from: 2, to: 5},
    {from: 2, to: 6},
    {from: 6, to: 7},
    {from: 6, to: 8},
    {from: 4, to: 7},
    {from: 5, to: 4},
    {from: 3, to: 8},
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
clickToUse: true,
layout: {
  improvedLayout: true,
  randomSeed: 1
}
};
var network = new vis.Network(container, data, options);

var applied = false
Reveal.addEventListener( 'slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    if (event.indexh == 4 && !applied) {
      applied = true
	// initialize your network!
	network = new vis.Network(container, data, options);
    }
} );


Reveal.addEventListener( 'fragmenthidden', function( event ) {
  if ( Reveal.getState().indexh == 11){
    network.setData(data)
  }
} );

Reveal.addEventListener( 'fragmentshown', function( event ) {
  if ( Reveal.getState().indexh == 11){
    // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 1, color: 'red'},
        {id: 2, color: 'green'},
        {id: 3, color: 'blue'},
        {id: 4, color: 'red'},
        {id: 5, color: 'blue'},
        {id: 6, color: 'red'},
        {id: 7, color: 'blue'},
        {id: 8, color: 'green'},
    ]);
    
    // create an array with edges
    var edges = new vis.DataSet([
        {from: 1, to: 3, color: 'white'},
        {from: 1, to: 2, color: 'white'},
        {from: 2, to: 4, color: 'white'},
        {from: 2, to: 3, color: 'white'},
        {from: 2, to: 5, color: 'white'},
        {from: 2, to: 6, color: 'white'},
        {from: 6, to: 7, color: 'white'},
        {from: 6, to: 8, color: 'white'},
        {from: 4, to: 7, color: 'white'},
        {from: 5, to: 4, color: 'white'},
        {from: 3, to: 8, color: 'white'},
    ]);
    
    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    network.setData(data)

  }
} );

// Treee
// create an array with nodes
var tree_nodes = new vis.DataSet([
    {id: 1, font:{size: 28}},
    {id: 2, font:{size: 28}},
    {id: 3, font:{size: 28}},
    {id: 4, font:{size: 28}},
    {id: 5, font:{size: 28}},
    {id: 6, font:{size: 28}},
    {id: 7, font:{size: 28}},
    {id: 8, font:{size: 28}},
    {id: 9, font:{size: 28}},
    {id: 10, font:{size: 28}},
]);

// create an array with edges
var tree_edges = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 3, to: 6},
    {from: 3, to: 7},
    {from: 7, to: 8},
    {from: 8, to: 9},
    {from: 6, to: 10},
]);

// create a network
var tree_container = document.getElementById('tree_network');

// provide the data in the vis format
var tree_data = {
    nodes: tree_nodes,
    edges: tree_edges
};
var tree_options = {
  clickToUse: false,
  height: '500px',
  layout: {
    improvedLayout: true,
    hierarchical: {
      enabled: true,
      sortMethod: 'directed',
    }
  },
  interaction:{
    dragNodes:false,
    dragView: true,
    selectable: true,
    zoomView: true
  }

};
var tree_network = new vis.Network(tree_container, tree_data, tree_options);

var tree_applied = false
Reveal.addEventListener( 'slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    if (event.indexh == 21 && !tree_applied) {
      tree_applied = true
      // initialize your network!
      tree_network = new vis.Network(tree_container, tree_data, tree_options);
    }
} );
Reveal.addEventListener( 'fragmenthidden', function( event ) {
  if (event.fragment.id == 'tree_add_node'){
    tree_edges.remove( 1 )
    tree_network.setData(tree_data)
  }
})

Reveal.addEventListener( 'fragmentshown', function( event ) {
  if (event.fragment.id == 'tree_add_node'){
    tree_edges.add( {id:1, from: 10, to: 9} )
    tree_network.setData(tree_data)
  }
})

Reveal.addEventListener( 'fragmenthidden', function( event ) {
  if (event.fragment.id == 'tree_add_label'){
    tree_network.setData(tree_data)
  }
})

Reveal.addEventListener( 'fragmentshown', function( event ) {
  if (event.fragment.id == 'tree_add_label'){
    var tree_nodes = new vis.DataSet([
        {id: 1, label: '0', font:{size: 28}},
        {id: 2, label: '1', font:{size: 28}},
        {id: 3, label: '1', font:{size: 28}},
        {id: 4, label: '2', font:{size: 28}},
        {id: 5, label: '2', font:{size: 28}},
        {id: 6, label: '2', font:{size: 28}},
        {id: 7, label: '2', font:{size: 28}},
        {id: 8, label: '3', font:{size: 28}},
        {id: 9, label: '4', font:{size: 28}},
        {id: 10, label: '3', font:{size: 28}},
    ]);
    var tree_data = {
      nodes: tree_nodes,
      edges: tree_edges
    };
    tree_network.setData(tree_data)
  }
})
