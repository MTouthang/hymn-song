import React, { ChangeEvent, useState } from 'react';

const LyricForm = () => {
  const [inputs, setInputs] = useState<string[]>(['']); // for dynamic input

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const removeInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  return (
    <div className="flex flex-col w-full p-8 mx-auto mt-20 bg-white rounded-lg shadow-md md:w-1/2 ">
      <h2 className="mb-1 text-lg font-medium text-center text-gray-900 title-font">
        Add Lyric Form
      </h2>
      <p className="mb-5 leading-relaxed text-center text-gray-600">
        Fill the following Lyric details precisely
      </p>
      <hr />
      {/* hym number  */}
      <div className="relative mb-4">
        <label htmlFor="hymnNumber" className="text-sm leading-7 text-gray-600">
          Hymn No.
        </label>
        <input
          placeholder="1"
          type="number"
          id="hymnNumber"
          name="hymnNumber"
          className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* hymn title  */}
      <div className="relative mb-4">
        <label htmlFor="title" className="text-sm leading-7 text-gray-600">
          Hymn Title
        </label>
        <input
          placeholder="Eisem'a Eihuhhingpau"
          type="string"
          id="title"
          name="title"
          className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* hymn key  */}
      <div className="relative mb-4">
        <label htmlFor="key" className="text-sm leading-7 text-gray-600">
          Hymn Key
        </label>
        <input
          placeholder="Doh is. C. (Psalms 126:1)"
          type="string"
          id="key"
          name="key"
          className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* hymn Composer  */}
      <div className="relative mb-4">
        <label htmlFor="composer" className="text-sm leading-7 text-gray-600">
          Hymn Composer
        </label>
        <input
          placeholder="Optional or Write composer name"
          type="string"
          id="composer"
          name="composer"
          className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* chorus */}
      <div className="relative mb-4">
        <label htmlFor="chorus" className="text-sm leading-7 text-gray-600">
          Chorus
        </label>
        <textarea
          placeholder="Vahchoi jingun, chungnung pena loupi, Chungnung chu vahchoiyun; Vahchoi jingun,Pakai le Leng chu vahchoi jingun"
          id="message"
          name="chorus"
          className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        ></textarea>
      </div>

      {/* Add verse */}

      <div className="relative mb-4">
        <p className="text-sm leading-7 text-gray-600"> Add Verses</p>
        <div className="ml-5">
          {inputs.map((input, index) => (
            <>
              <input
                key={index}
                value={input}
                onChange={(e) => handleInputChange(index, e)}
                placeholder={`Verse ${index + 1}`}
                className="w-full px-3 py-1 mb-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <button onClick={() => removeInput(index)}>Remove verse </button>
            </>
          ))}
          <button onClick={addInput}>Add more verse</button>
        </div>
      </div>

      <button className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
        Submit
      </button>
      <p className="mt-3 text-xs text-center text-gray-500">
        Kindly double check the lyric content before submitting
      </p>
    </div>
  );
};

export default LyricForm;
