import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBoardContext } from '../../../context/BoardContext';
import { useAuth } from '../../../context/AuthContext';

const CreateAccountNine = () => {
  const navigate = useNavigate();
  const { userCategory } = useAuth();
  const { boardData, setBoardData } = useBoardContext();

  const [boardName, setBoardName] = useState(boardData.boardName || '');
  const [isNextEnabled, setIsNextEnabled] = useState(boardData.boardName?.trim().length > 0);

  useEffect(() => {
    if (userCategory === 'ngo' || userCategory === 'nonprofit') {
      navigate('/ten');
    }
  }, [userCategory, navigate]);

  if (userCategory === 'ngo' || userCategory === 'nonprofit') {
    return null;
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBoardName(value);
    setIsNextEnabled(value.trim().length > 0);
  };

  const handleNext = () => {
    setBoardData(prev => ({
      ...prev,
      boardName: boardName.trim()
    }));
    navigate('/ten');
  };

  return (
    <div className="fixed inset-0 bg-[rgba(41,47,76,0.7)] flex items-center justify-center">
      <div className="bg-white w-full h-full overflow-hidden shadow-2xl flex relative">
        <button
          className="fixed top-2.5 right-2.5 z-10 w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#323338]" />
        </button>

        <div className="w-1/2 flex flex-col justify-between bg-white">
          <div className="flex-1 overflow-y-auto px-20 pt-20 pb-12">
            <div className="flex justify-between items-center mb-11">
              <div className="h-[25px]">
                <img
                  src="https://dapulse-res.cloudinary.com/image/upload/assets/work-management.png"
                  alt="logo"
                  className="h-full"
                />
              </div>
            </div>

            <div className="max-w-[600px] min-w-[375px]">
              <div className="mb-11">
                <h2 className="text-2xl font-medium text-[#323338] leading-[30px] tracking-[-0.1px]" style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}>
                  Let's start working together
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="board-name" className="block text-sm text-[#323338] mb-2 leading-5 p-[2px 0]" style={{ fontFamily: 'Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP",' }}>
                    Give your board a name, e.g. marketing plan, sales pipeline,<br />quarterly roadmap...
                  </label>
                  <div className="relative w-full max-w-[400px]">
                    <input
                      type="text"
                      id="board-name"
                      className="w-full h-10 px-4 py-2 border border-[#c3c6d4] rounded text-base text-[#323338] focus:outline-none focus:border-[#0073ea] transition-colors"
                      placeholder="My first project"
                      maxLength={40}
                      value={boardName}
                      onChange={handleInputChange}
                      autoComplete="off"
                      style={{ fontFamily: 'Figtree, ' }}
                    />
                  </div>
                </div>

                <div className="bg-[#f6f7fb] px-2 py-4 rounded-lg text-sm max-w-[400px] ">
                  <p className="text-[#323338]" style={{ fontFamily: 'Figtree, Roboto, ' }}>
                    In monday.com, "boards" are the place where all your content lives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 px-20 py-6 flex justify-end items-center bg-white ">
            <button
              onClick={handleNext}
              className={`px-6 py-2 rounded flex items-center gap-2 transition-colors ${isNextEnabled
                ? 'bg-[#0073ea] text-white hover:bg-[#0060b9]'
                : 'bg-[#e7e9ef] text-gray-400 cursor-not-allowed'
                }`}
              disabled={!isNextEnabled}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-1/2 bg-[#eceff8] flex items-center justify-center">
          <div
            className="bg-white w-full h-[650px] relative overflow-hidden ml-16 rounded-tl-2xl rounded-bl-2xl"
            style={{
              filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2))',
              paddingTop: '30px',
              paddingLeft: '30px'
            }}
          >
            <div className="mb-2">
              {boardName ? (
                <h1
                  className="text-[32px] font-medium text-[#323338] leading-[40px] tracking-[-0.5px] truncate max-w-[600px]"
                  style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}
                >
                  {boardName}
                </h1>
              ) : (
                <div className="flex items-center">
                  <div className="h-2 w-[180px] bg-[#c3c6d4] rounded-lg animate-pulse"></div>
                </div>
              )}
            </div>

            <div style={{ height: '50px' }}></div>

            <div className="flex gap-0 w-full">
              <div style={{ width: '240px', flexShrink: 0 }}>
                <div className="mb-0">
                  <div className="flex items-center mb-3" style={{ height: '24px' }}>
                    <div className="h-1.5 w-[120px] bg-[#579bfc] rounded"></div>
                  </div>
                  <div
                    className="flex items-center bg-white"
                    style={{
                      borderLeft: '4px solid #579bfc',
                      borderTop: '0.8px solid #d0d4e4',
                      borderBottom: '0.8px solid #d0d4e4',
                      borderRight: '0.8px solid #d0d4e4',
                      borderTopLeftRadius: '4px',
                      height: '40px',
                      paddingLeft: '12px'
                    }}
                  >
                    <div className="h-1 w-20 bg-[#c3c6d4] rounded"></div>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center bg-white"
                      style={{
                        borderLeft: '4px solid #579bfc',
                        borderBottom: '0.8px solid #d0d4e4',
                        borderRight: '0.8px solid #d0d4e4',
                        height: '40px',
                        paddingLeft: '12px'
                      }}
                    >
                      <div className="h-1 w-20 bg-[#c3c6d4] rounded"></div>
                    </div>
                  ))}
                  <div
                    className="flex items-center bg-white"
                    style={{
                      borderLeft: '4px solid rgba(87, 155, 252, 0.5)',
                      borderBottom: '0.8px solid #d0d4e4',
                      borderRight: '0.8px solid #d0d4e4',
                      borderBottomLeftRadius: '4px',
                      height: '40px',
                      paddingLeft: '12px'
                    }}
                  >
                    <div className="h-1 w-20 bg-[rgba(103,104,121,0.1)] rounded"></div>
                  </div>
                  <div style={{ height: '40px', borderRight: '0.8px solid #d0d4e4' }}></div>
                </div>
                <div>
                  <div className="flex items-center mb-3" style={{ height: '24px' }}>
                    <div className="h-1.5 w-[120px] bg-[#00c875] rounded"></div>
                  </div>
                  <div
                    className="flex items-center bg-white"
                    style={{
                      borderLeft: '4px solid #00c875',
                      borderTop: '0.8px solid #d0d4e4',
                      borderBottom: '0.8px solid #d0d4e4',
                      borderRight: '0.8px solid #d0d4e4',
                      borderTopLeftRadius: '4px',
                      height: '40px',
                      paddingLeft: '12px'
                    }}
                  >
                    <div className="h-1 w-20 bg-[#c3c6d4] rounded"></div>
                  </div>
                  <div
                    className="flex items-center bg-white"
                    style={{
                      borderLeft: '4px solid rgba(0, 200, 117, 0.5)',
                      borderBottom: '0.8px solid #d0d4e4',
                      borderRight: '0.8px solid #d0d4e4',
                      borderBottomLeftRadius: '4px',
                      height: '40px',
                      paddingLeft: '12px'
                    }}
                  >
                    <div className="h-1 w-20 bg-[rgba(103,104,121,0.1)] rounded"></div>
                  </div>
                  <div style={{ height: '40px', borderRight: '0.8px solid #d0d4e4' }}></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-0">
                  <div style={{ height: '24px', marginBottom: '12px' }}></div>
                  <div className="flex" style={{ height: '40px' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 flex items-center justify-center bg-white"
                        style={{
                          borderTop: '0.8px solid #d0d4e4',
                          borderBottom: '0.8px solid #d0d4e4',
                          borderRight: '0.8px solid #d0d4e4'
                        }}
                      >
                        <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                      </div>
                    ))}
                    <div
                      className="flex items-center justify-center bg-white"
                      style={{
                        width: '48px',
                        borderTop: '0.8px solid #d0d4e4',
                        borderBottom: '0.8px solid #d0d4e4'
                      }}
                    >
                      <span className="text-[#676879] text-lg font-light">+</span>
                    </div>
                  </div>
                  {[0, 1, 2].map((rowIdx) => (
                    <div key={rowIdx} className="flex" style={{ height: '40px' }}>
                      {[0, 1, 2].map((colIdx) => (
                        <div
                          key={colIdx}
                          className="flex-1 flex items-center justify-center bg-white"
                          style={{
                            borderBottom: '0.8px solid #d0d4e4',
                            borderRight: '0.8px solid #d0d4e4'
                          }}
                        >
                          <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                        </div>
                      ))}
                      <div
                        className="bg-white"
                        style={{
                          width: '48px',
                          borderBottom: '0.8px solid #d0d4e4'
                        }}
                      ></div>
                    </div>
                  ))}
                  <div className="flex" style={{ height: '40px' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white"
                        style={{
                          borderBottom: '0.8px solid #d0d4e4',
                          borderRight: '0.8px solid #d0d4e4'
                        }}
                      ></div>
                    ))}
                    <div
                      className="bg-white"
                      style={{
                        width: '48px',
                        borderBottom: '0.8px solid #d0d4e4'
                      }}
                    ></div>
                  </div>
                  <div className="flex" style={{ height: '40px' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white"
                        style={{
                          borderBottom: '0.8px solid #d0d4e4',
                          borderRight: '0.8px solid #d0d4e4'
                        }}
                      ></div>
                    ))}
                    <div
                      className="bg-white"
                      style={{
                        width: '48px',
                        borderBottom: '0.8px solid #d0d4e4'
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div style={{ height: '24px', marginBottom: '12px' }}></div>
                  <div className="flex" style={{ height: '40px' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 flex items-center justify-center bg-white"
                        style={{
                          borderTop: '0.8px solid #d0d4e4',
                          borderBottom: '0.8px solid #d0d4e4',
                          borderRight: '0.8px solid #d0d4e4'
                        }}
                      >
                        <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                      </div>
                    ))}
                    <div
                      className="flex items-center justify-center bg-white"
                      style={{
                        width: '48px',
                        borderTop: '0.8px solid #d0d4e4',
                        borderBottom: '0.8px solid #d0d4e4'
                      }}
                    >
                      <span className="text-[#676879] text-lg font-light">+</span>
                    </div>
                  </div>
                  <div className="flex" style={{ height: '40px' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white"
                        style={{
                          borderBottom: '0.8px solid #d0d4e4',
                          borderRight: '0.8px solid #d0d4e4'
                        }}
                      ></div>
                    ))}
                    <div
                      className="bg-white"
                      style={{
                        width: '48px',
                        borderBottom: '0.8px solid #d0d4e4'
                      }}
                    ></div>
                  </div>
                  <div className="flex" style={{ height: '40px' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white"
                        style={{
                          borderBottom: '0.8px solid #d0d4e4',
                          borderRight: '0.8px solid #d0d4e4'
                        }}
                      ></div>
                    ))}
                    <div
                      className="bg-white"
                      style={{
                        width: '48px',
                        borderBottom: '0.8px solid #d0d4e4'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountNine;