
const colorPicker = new iro.ColorPicker("#colorPickerContainer", {
    width: 70,
    color: "#ff0000",
    
    layout: [
        {
            component: iro.ui.Wheel,
            options: {
                borderColor: "none",
                borderWidth: 0,
            }
        }
    ]
});

const changeColor = (color) => {
    const modelViewer = document.getElementById('myModel');
    const rgb = color.rgb;
    const scene = modelViewer.model;

    if (scene) {
        const material = scene.materials[0];
        material.pbrMetallicRoughness.setBaseColorFactor([rgb.r / 255, rgb.g / 255, rgb.b / 255, 1.0]);
    }
};


colorPicker.on('color:change', changeColor);





// Handle image upload
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageUrl = e.target.result;
        applyLogo(imageUrl);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Function to apply logo
const applyLogo = (imageUrl) => {
    const modelViewer = document.querySelector('model-viewer');
    const scene = modelViewer.model;

    if (scene) {
        const textureLoader = new TextureLoader();
        const logoTexture = textureLoader.load(imageUrl);

        // Assuming the material is at index 0
        const material = scene.materials[0];

        // Apply logo texture to the material's diffuse map
        material.pbrMetallicRoughness.baseColorTexture = logoTexture;

        // Adjust texture position, scale, and rotation to place it on the center of the T-shirt
        material.pbrMetallicRoughness.baseColorTexture.offset.set(0.5, 0.5);
        material.pbrMetallicRoughness.baseColorTexture.repeat.set(0.5, 0.5);
        material.pbrMetallicRoughness.baseColorTexture.rotation = Math.PI / 2;
    }
};
