import React, { useState } from 'react';
import { ChevronDown,ChevronUp } from 'lucide-react';
const ComponentEditorAdvanced = ({ id, webElements, setWebElements }) => {
  const element = webElements[id];
  const [on,setOFF] = useState(false)
  const handleAdvancedChange = (property, value) => {
    setWebElements((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        styles: {
          ...prev[id].styles,
          [property]: value,
        },
      },
    }));
  };

  const handleBorderWidthChange = (side, value) => {
    handleAdvancedChange(`border${side}Width`, `${value}px`);
  };

  const [hoverStyles, setHoverStyles] = useState(element.styles.hover || {});

  const handleHoverChange = (property, value) => {
    setHoverStyles((prev) => ({
      ...prev,
      [property]: value,
    }));
    handleAdvancedChange('hover', { ...hoverStyles, [property]: value });
  };
  const boxShadow = element.styles.boxShadow || '0px 0px 0px 0px #000000';

  const [shadowParams, setShadowParams] = useState({
    horizontalOffset: boxShadow.split(' ')[0] || '0px',
    verticalOffset: boxShadow.split(' ')[1] || '0px',
    blurRadius: boxShadow.split(' ')[2] || '0px',
    spreadRadius: boxShadow.split(' ')[3] || '0px',
    color: boxShadow.split(' ')[4] || '#000000',
  });

  const handleShadowChange = (property, value) => {
    setShadowParams((prev) => ({
      ...prev,
      [property]: value,
    }));
    
    const { horizontalOffset, verticalOffset, blurRadius, spreadRadius, color } = {
      ...shadowParams,
      [property]: value,
    };
    
    const newBoxShadow = `${horizontalOffset} ${verticalOffset} ${blurRadius} ${spreadRadius} ${color}`;
    setWebElements((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        styles: {
          ...prev[id].styles,
          boxShadow: newBoxShadow,
        },
      },
    }));
  };

  return (
    <div className="advanced-editor p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="font-semibold text-lg">Advanced Properties<button onClick={() => setOFF((prev) => !prev)}>
                  {on ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button></h3>


    {on?<>
      {/* Border Width */}
      <h4 className="font-semibold mt-3">Border Width</h4>
      <div className="grid grid-cols-2 gap-2">
        {['Top', 'Bottom', 'Left', 'Right'].map((side) => (
          <label key={side}>
            {side}:
            <input
              type="number"
              value={parseInt(element.styles[`border${side}Width`]) || 0}
              onChange={(e) => handleBorderWidthChange(side, e.target.value)}
              className="ml-2 p-1 border border-gray-300 rounded"
            />
          </label>
        ))}
      </div>

      {/* Cursor */}
      <label>
        Cursor:
        <select
          value={element.styles.cursor || 'default'}
          onChange={(e) => handleAdvancedChange('cursor', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          <option value="default">Default</option>
          <option value="pointer">Pointer</option>
          <option value="text">Text</option>
          <option value="move">Move</option>
          <option value="not-allowed">Not Allowed</option>
        </select>
      </label>

      {/* Box Shadow Controls */}
      <h4 className="font-semibold mt-3">Box Shadow</h4>
      <div className="grid grid-cols-2 gap-2">
        <label>
          Horizontal Offset:
          <input
            type="number"
            value={parseInt(shadowParams.horizontalOffset)}
            onChange={(e) => handleShadowChange('horizontalOffset', `${e.target.value}px`)}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
        <label>
          Vertical Offset:
          <input
            type="number"
            value={parseInt(shadowParams.verticalOffset)}
            onChange={(e) => handleShadowChange('verticalOffset', `${e.target.value}px`)}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
        <label>
          Blur Radius:
          <input
            type="number"
            value={parseInt(shadowParams.blurRadius)}
            onChange={(e) => handleShadowChange('blurRadius', `${e.target.value}px`)}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
        <label>
          Spread Radius:
          <input
            type="number"
            value={parseInt(shadowParams.spreadRadius)}
            onChange={(e) => handleShadowChange('spreadRadius', `${e.target.value}px`)}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            value={shadowParams.color}
            onChange={(e) => handleShadowChange('color', e.target.value)}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
      </div>


      {/* Letter Spacing */}
      <label>
        Letter Spacing:
        <input
          type="number"
          value={parseInt(element.styles.letterSpacing) || 0}
          onChange={(e) => handleAdvancedChange('letterSpacing', `${e.target.value}px`)}
          className="ml-2 p-1 border border-gray-300 rounded"
          placeholder="px"
        />
      </label>

      {/* Hover Properties */}
      <h4 className="font-semibold mt-3">Hover Properties</h4>
      <label>
        Hover Color:
        <input
          type="color"
          value={hoverStyles.color || '#000000'}
          onChange={(e) => handleHoverChange('color', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>
      <label>
        Hover Background Color:
        <input
          type="color"
          value={hoverStyles.backgroundColor || '#ffffff'}
          onChange={(e) => handleHoverChange('backgroundColor', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label>
      <label>
        Hover Box Shadow:
        <input
          type="text"
          placeholder="e.g., 5px 5px 10px #000000"
          value={hoverStyles.boxShadow || ''}
          onChange={(e) => handleHoverChange('boxShadow', e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </label></>:<></>}
    </div>
  );
};

export default ComponentEditorAdvanced;