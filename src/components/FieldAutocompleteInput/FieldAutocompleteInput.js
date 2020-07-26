import React from 'react'
// import Styles from './Styles'
import { Field } from 'react-final-form'
import DownshiftInput from './DownshiftInput'
import {autocompleteCategorySelected} from '../../util/validators';


const fruit = [
    { value: 'Apple', label: '🍎 Apple' },
    { value: 'Banana', label: '🍌 Banana' },
    { value: 'Cherry', label: '🍒 Cherry' },
    { value: 'Grape', label: '🍇 Grape' },
    { value: 'Kiwi', label: '🥝 Kiwi' },
    { value: 'Orange', label: '🍊 Orange' },
    { value: 'Peach', label: '🍑 Peach' },
    { value: 'Pear', label: '🍐 Pear' },
    { value: 'Pineapple', label: '🍍 Pineapple' },
    { value: 'Strawberry', label: '🍓 Strawberry' },
    { value: 'Watermelon', label: '🍉 Watermelon' }
  ];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(100)
  window.alert(JSON.stringify(values, 0, 2))
}
const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.fruit) {
    errors.fruit = 'Required'
  }
  return errors
}
const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const FieldAutoCompleteInput = props => {
  const {
      rootClassName,
      className,
      name,
      items,
      placeholder,
      ...rest
    } = props;

  return (
    <div>
        <Field
            className={className}
            name={name}
            items={fruit} //{items}
            component={DownshiftInput}
            placeholder={placeholder}
            // validate={autocompleteCategorySelected("have to be same")}
        />
        {/* <Error name={name} /> */}
    </div>);


};

export default FieldAutoCompleteInput;


//     <Form
//       onSubmit={onSubmit}
//       validate={validate}
//       render={({ handleSubmit, form, pristine, submitting, values }) => (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>First Name</label>
//             <Field
//               name="firstName"
//               component="input"
//               type="text"
//               placeholder="First Name"
//             />
//             <Error name="firstName" />
//           </div>
//           <div>
//             <label>Favorite Fruit</label>
//             <Field
//               name="fruit"
//               items={fruit}
//               component={DownshiftInput}
//               placeholder="Favorite Fruit"
//             />
//             <Error name="fruit" />
//           </div>
//           <div className="buttons">
//             <button type="submit" disabled={submitting}>
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={form.reset}
//               disabled={submitting || pristine}
//             >
//               Reset
//             </button>
//           </div>
//           <pre>{JSON.stringify(values, 0, 2)}</pre>
//         </form>
//       )}
//     />
//   </Styles>
// )

// render(<App />, document.getElementById('root'))
