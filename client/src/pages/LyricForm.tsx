import { useEffect, useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { ILyricFormData, IVerses } from '../types';
import { AxiosError } from 'axios';
import { handleErrorToast, handleSuccessToast } from '../helper/taoster';
import { AddLyric } from '../helper/api';




const initialState: ILyricFormData = {
  hymnNumber: NaN,
  title: '',
  key: '',
  verses: [],
};

const LyricForm = () => {
  const [inputs, setInputs] = useState<IVerses[]>([]); // for dynamic input & verses
  const [lyric, setLyric] = useState<ILyricFormData>(initialState);

  const addInput = () => {
    setInputs([...inputs, { verseNumber: 0, lyrics: '' }]);
  };

  const removeInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);

    // Decrement the verseNumber of subsequent inputs
    for (let i = index; i < newInputs.length; i++) {
      newInputs[i].verseNumber--;
    }

    setInputs(newInputs);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = {
      ...newInputs[index],
      verseNumber: index + 1,
      lyrics: event.target.value,
    };
    setInputs(newInputs);
  };

  useEffect(() => {
    setLyric((prevLyric) => ({ ...prevLyric, verses: inputs }));
  }, [inputs]);

 

  const handleLyricSubmission = async () => {
   
    try {
      
      // clean to remove \n 
      const cleanVerse = lyric.verses.map((verse) => ({
          ...verse,
          lyrics: verse.lyrics.replace(/\n/g, '')
      })  )

      const cleanChorus = lyric.chorus && lyric.chorus.replace(/\n/g, '')

      lyric.chorus = cleanChorus
      lyric.verses = cleanVerse
      
      // const response: AxiosResponse<ILyricFormData> =
      //   await axios.post<ILyricFormData>(
      //     'http://localhost:8080/api/v1/lyric/',
      //     lyric
      //   );

      const response = await AddLyric(lyric)
      
      if(response?.data) {
        handleSuccessToast("Hymn Lyric added successfully")

        // clear input
        setInputs([])
        setLyric(initialState)
        
      }
    } catch (error) {
      if(error instanceof AxiosError){
        handleErrorToast(error.response?.data.message)
      }
      
    }
  };

  

  return (
    <>
      <div className="flex flex-col w-full p-8 mx-auto mt-20 bg-white rounded-lg shadow-md md:w-1/2 ">
      
      <h2 className="mb-1 text-lg font-medium text-center text-gray-900 title-font"
       
      >
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
          value={lyric?.hymnNumber || 1}
          onChange={(e) =>
            setLyric({ ...lyric, hymnNumber: Number(e.target.value) })
          }
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
          value={lyric?.title || ''}
          onChange={(e) => setLyric({ ...lyric, title: e.target.value })}
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
          value={lyric?.key || ''}
          onChange={(e) => setLyric({ ...lyric, key: e.target.value })}
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
          value={lyric?.composer || ''}
          onChange={(e) => setLyric({ ...lyric, composer: e.target.value })}
          className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* chorus */}
      <div className="relative mb-4">
        <label htmlFor="chorus" className="text-sm leading-7 text-gray-600">
          Chorus
        </label>
        <textarea
          placeholder="Add chorus it it's available"
          id="message"
          name="chorus"
          value={lyric?.chorus || ''}
          onChange={(e) => setLyric({ ...lyric, chorus: e.target.value })}
          className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        ></textarea>
      </div>

      {/* Add verse */}
      {/* TODO: fix htmlInputvalue htmlareainput */}
      <div className="relative mb-4">
        <p className="text-sm leading-7 text-gray-600"> Add Verses</p>
        <div className="ml-5">
          {inputs.map((_input, index) => (
            <div className="flex items-center my-2">
              <textarea
                key={index}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Add verse"
                className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {index === inputs.length - 1 && (
                <CiCircleRemove
                  className="w-8 h-6 text-gray-500 hover:text-red-300"
                  title="Remove verse"
                  onClick={() => removeInput(index)}
                />
              )}
            </div>
          ))}

          <IoIosAddCircleOutline
            className="w-8 h-6 text-gray-500 hover:text-green-600"
            title="add verse"
            onClick={addInput}
          />
        </div>
      </div>

      <button
        className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
        onClick={handleLyricSubmission}
      >
        Submit
      </button>
      <p className="mt-3 text-xs text-center text-gray-500">
        Kindly double check the lyric content before submitting
      </p>
    </div>
    </>
    
  );
};

export default LyricForm;
