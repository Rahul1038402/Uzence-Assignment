import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Choose a unique username',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    value: 'mypassword123',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    showClearButton: true,
    value: 'search query',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Field',
    placeholder: 'Loading...',
    loading: true,
    value: 'Some value',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Disabled value',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        variant="outlined"
        label="Outlined"
        placeholder="Outlined variant"
      />
      <InputField
        variant="filled"
        label="Filled"
        placeholder="Filled variant"
      />
      <InputField
        variant="ghost"
        label="Ghost"
        placeholder="Ghost variant"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        size="sm"
        label="Small"
        placeholder="Small size"
      />
      <InputField
        size="md"
        label="Medium"
        placeholder="Medium size"
      />
      <InputField
        size="lg"
        label="Large"
        placeholder="Large size"
      />
    </div>
  ),
};