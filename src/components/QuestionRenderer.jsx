import React from 'react';

export default function QuestionRenderer({ question, value, onChange }) {
  const handleRadioChange = (optionValue) => {
    onChange(question.id, optionValue);
  };

  const handleCheckboxChange = (optionValue) => {
    const currentValues = value || [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter(v => v !== optionValue)
      : [...currentValues, optionValue];
    onChange(question.id, newValues);
  };

  const handleTextChange = (e) => {
    onChange(question.id, e.target.value);
  };

  const handleOtherChange = (e) => {
    onChange(`${question.id}_other`, e.target.value);
  };

  switch (question.type) {
    case 'radio':
      return (
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 ${
                value === option.value
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-sm'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={value === option.value}
                onChange={() => handleRadioChange(option.value)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 sm:ml-3 text-base sm:text-lg font-medium text-gray-800">{option.label}</span>
            </label>
          ))}
          {question.hasOther && (
            <div className="mt-3 sm:mt-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {question.otherLabel}
              </label>
              <input
                type="text"
                onChange={handleOtherChange}
                className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base sm:text-lg"
                placeholder="Especifique..."
              />
            </div>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option) => {
            const isChecked = (value || []).includes(option.value);
            return (
              <label
                key={option.value}
                className={`flex items-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 ${
                  isChecked
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md'
                    : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-sm'
                }`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(option.value)}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 focus:ring-green-500 rounded"
                />
                <span className="ml-2 sm:ml-3 text-base sm:text-lg font-medium text-gray-800">{option.label}</span>
              </label>
            );
          })}
          {question.hasOther && (
            <div className="mt-3 sm:mt-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {question.otherLabel}
              </label>
              <input
                type="text"
                onChange={handleOtherChange}
                className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-base sm:text-lg"
                placeholder="Especifique..."
              />
            </div>
          )}
        </div>
      );

    case 'textarea':
      return (
        <textarea
          value={value || ''}
          onChange={handleTextChange}
          className="w-full min-h-[120px] sm:min-h-[140px] md:min-h-[150px] p-3 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-base sm:text-lg resize-y"
          placeholder={question.placeholder}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          value={value || ''}
          onChange={handleTextChange}
          className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base sm:text-lg"
          placeholder={question.placeholder}
        />
      );

    default:
      return null;
  }
}
