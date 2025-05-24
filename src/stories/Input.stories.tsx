/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Input, InputSize, Intent } from '../components/Input/Input';
import { REG_EXS } from "../utils/regex";


const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    tags: ["autodocs"],
    parameters: {
      layout: "centered"
    },
    argTypes: {
       intent: {
        type: 'string',
        description: 'variant',
        options: ['initial', 'success', 'error', 'info'],
        control: 'select'
       },
       label: {
        type: 'string',
        description: 'label',
        control: 'text'
       },
       type: {
        type: 'string',
        options: ['text', 'email', 'number', 'sarch', 'date', 'phone', 'currency']
       }
    },
}

export default meta;

type Story = StoryObj<typeof Input>;

const InputDefault = () => {

  const [value, setValue] = useState('')

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Input
        onChange={(value) => setValue(value as string)}
        label='Name'
        name='name'
        placeholder='Enter your name'
        wrapperStyles={{ margin: '0.5rem' }}
        value={value}
      />
  </div>
}

const InputIntents = () => {
  const intents = ['initial', 'success', 'error', 'info']

  const [value, setValue] = useState<string>('')

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
    {
      intents.map(intent => (
        <Input
          key={intent}
          type="number"
          intent={intent as Intent}
          max={100000000}
          onChange={(value) => setValue(value as string)}
          label={intent}
          name='lastname'
          placeholder='Enter your last name'
          wrapperStyles={{ margin: '0.5rem' }}
          value={value}
        />
      ))
    }
  </div>
}

const InputSizes = () => {
  const sizes = ['sm', 'md', 'lg']

  const [value, setValue] = useState<string>('')

  return <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
    {
      sizes.map(size => (
        <Input
          key={size}
          type="search"
          size={size as InputSize}
          onChange={(value) => setValue(value as string)}
          label={size}
          name='search'
          placeholder='Search'
          wrapperStyles={{ margin: '0.5rem' }}
          value={value}
        />
      ))
    }
  </div>
}


const InputErrorMsg = () => {

  const [value, setValue] = useState('email.email.com')
  const [errMsg, setErrMsg] = useState('Invalid email format')

  const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
     REG_EXS.email
    );
};

  const handleChange = (value: string) => {
    const isValidEmail = validateEmail(value)
    setValue(value)
    if (!isValidEmail) setErrMsg('Invalid email format.')
    else setErrMsg('')  
  }

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Input
        onChange={(value) => handleChange(value as string)}
        label='Email'
        name='email'
        intent={errMsg ? 'error' : 'success'}
        errorMessage={errMsg}
        placeholder='Enter your name'
        wrapperStyles={{ margin: '0.5rem' }}
        value={value}
      />
  </div>
}

const InputCurrencyAndNumber = () => {
  
  const [cost, setCost] = useState<number>(0)
  const [quantity, setQuantity] = useState(0)

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Input
      type='currency'
      max={100000000}
      onValueChange={(value) => setCost(value as number)}
      label='Cost'
      name='cost'
      placeholder='Enter the cost'
      wrapperStyles={{ margin: '0.5rem' }}
      value={cost}
    />

     <Input
      type='number'
      onChange={(value) => setQuantity(value as number)}
      label='Quantity'
      name='quantity'
      placeholder='Enter the quantity'
      wrapperStyles={{ margin: '0.5rem' }}
      value={quantity}
    />
  </div>
}

const InputPass = () => {

  const [value, setValue] = useState('')

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Input
        onChange={(value) => setValue(value as string)}
        label='Password'
        type='password'
        name='password'
        placeholder='Enter your password'
        wrapperStyles={{ margin: '0.5rem' }}
        value={value}
      />
  </div>
}


export const Input_default: Story = {
  name: 'Input default',
  render: () => <InputDefault />
}


export const Input_intents: Story = {
  name: 'Input intents',
  render: () => <InputIntents />
}

export const Input_err_msg: Story = {
  name: 'Input error message prop',
  render: () => <InputErrorMsg />
}

export const Input_currency_and_number: Story = {
  name: 'Input currency and number',
  render: () => <InputCurrencyAndNumber />
}

export const Input_pass: Story = {
  name: 'Password input',
  render: () => <InputPass />
}

export const Input_sizes: Story = {
  name: 'Input size prop',
  render: () => <InputSizes />
}


