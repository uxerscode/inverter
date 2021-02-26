const {Color} = require("scenegraph");
var assets = require("assets");


function invertColor(color) {
    var a = color.a;
    var r = 255 - color.r;
    var b = 255 - color.b;
    var g = 255 - color.g;
    return new Color({r: r, b: b, g: g, a:a});
}

function invertColorAssets() {
    var allColors = assets.colors.get();
    allColors.forEach((asset) => {
        if(asset.color instanceof Color) {
            assets.colors.delete(asset);
        }
    });
    allColors.forEach((asset) => {
        if(asset.color instanceof Color) {
            asset.color = invertColor(asset.color);
            assets.colors.add(asset);
        }
    });
}

function invertNodeColor(node) {
    if(node.fill) {
        if(node.fill instanceof Color) {
            node.fill = invertColor(node.fill);
        }
    }
    if(node.stroke) {
        if(node.stroke instanceof Color) {
            node.stroke = invertColor(node.stroke);
        }
    }
}

function invertNode(node) {
    invertNodeColor(node);
    node.children.forEach((child) =>{
        invertNode(child);
    });
}

function invertColorsFunction(selection, documentRoot) {
    if(selection.items.length === 0) {
        invertNode(documentRoot);
        invertColorAssets();
    } else {
        selection.items.forEach((node) => {
            invertNode(node);
        });
    }
}

module.exports = {
    commands: {
        invertColors: invertColorsFunction
    }
};
