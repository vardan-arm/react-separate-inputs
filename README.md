# react-separate-inputs
 React component for separate numeric input fields. Supports both left-to-right and right-to-left layouts.
 
 Tested on Chrome, Firefox, Edge, IE11.

#Usage
```
<SessionIdContainerComponent
    inputLength = {6}
    onChange={val => {
      console.log(`New value is ${val}`)
    }}
  />
```

### Props
`inputLength` Number of separate inputs. Optional, the default value is `4`.
`onChange` Function to handle new value
`layoutDirection` Layout direction, can be `ltr` for languages with left-to-right layout or `rtl` for right-to-left layout. 
Optional, the default value is `ltr`.

`TODO` Add a description and a link to a working example