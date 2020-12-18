import React from 'react';
import { TextField, Slider } from '../../components';
import { banners, DEFAULT_BANNER_IMAGE } from '../../config/constants';

export const TextFieldDemo = () => (
  <>
    <div>
      <Slider altText="No Image" duration="1000" height="300" random banner={banners} defaultbanner={DEFAULT_BANNER_IMAGE} />
    </div>
    <p><b>This is a Disabled Input</b></p>
    <TextField
      disabled
      value="Disabled Input"
    />
    <p><b>A valid Input</b></p>
    <TextField value="Accessible" />

    <p><b>An Input With Errors</b></p>
    <TextField value="101" error="Cloud not be greater than" />
  </>
);
