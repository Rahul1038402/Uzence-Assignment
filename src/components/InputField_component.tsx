import { useState } from 'react';
import InputField from './InputField/InputField';

// Main Component
export const InputField_component = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requiredField, setRequiredField] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <section id="inputfield" className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 scroll-mt-24">
        <h2 className="text-4xl text-purple-600 [text-shadow:0_0_8px_rgba(167,139,250,0.4)] text-center font-bold mb-12">
          InputField Component
        </h2>
        
        {/* Basic Examples */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Basic Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="We'll never share your email"
                showClearButton
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPasswordToggle
              />

              <InputField
                label="Search Users"
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                showClearButton
                size="lg"
              />
            </div>

            <div className="space-y-6">
              <InputField
                label="Required Field *"
                placeholder="This field would be required"
                value={requiredField}
                onChange={(e) => setRequiredField(e.target.value)}
                helperText="This field would be required in a form"
              />

              <InputField
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
                value="Cannot edit this"
              />

              <InputField
                label="Loading State"
                placeholder="Loading data..."
                loading
                value="Processing..."
              />
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Outlined (Default)"
              variant="outlined"
              placeholder="Outlined variant"
            />
            
            <InputField
              label="Filled Variant"
              variant="filled"
              placeholder="Filled variant"
            />

            <InputField
              label="Ghost Variant"
              variant="ghost"
              placeholder="Ghost variant"
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Small Size"
              size="sm"
              placeholder="Small input"
              helperText="Small size input"
            />
            
            <InputField
              label="Medium Size (Default)"
              size="md"
              placeholder="Medium input"
              helperText="Medium size input"
            />

            <InputField
              label="Large Size"
              size="lg"
              placeholder="Large input"
              helperText="Large size input"
            />
          </div>
        </div>

        {/* States */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">States & Validation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InputField
                label="Error State"
                placeholder="Invalid input"
                invalid
                errorMessage="This field contains an error"
                value="invalid@email"
              />

              <InputField
                label="Field with Error"
                placeholder="Field with validation error"
                invalid
                errorMessage="This field has an error"
              />
            </div>

            <div className="space-y-6">
              <InputField
                label="Valid Input"
                placeholder="Valid input"
                value="valid.email@example.com"
                helperText="This looks good!"
              />

              <InputField
                label="Disabled with Value"
                placeholder="Disabled"
                disabled
                value="Read-only value"
                helperText="This field is disabled"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};