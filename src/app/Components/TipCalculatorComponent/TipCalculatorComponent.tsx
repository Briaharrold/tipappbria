'use client'
import { useState, useEffect } from 'react';
import React from 'react'

export default function TipCalculatorComponent() {
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isFilled2, setIsFilled2] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [bill, setBill] = useState<number | undefined>(undefined);
  const [peopleCount, setPeopleCount] = useState<number | undefined>(undefined);
  const [tip, setTip] = useState<number>(0);
  const [tipPerPerson, setTipPerPerson] = useState<string>('$0.00');
  const [totalPerPerson, setTotalPerPerson] = useState<string>('$0.00');

  

  const tipForEach = (price: number, tipAmount:number, people: number) => {
    let total = (price * tipAmount) / people;
    let rounded = Math.round(total * 100) / 100;
    return rounded;
}

 const totalForEach = (price: number, tipAmount:number, people:number) => {
    let tip = (price * tipAmount);
    let total = (tip + price)/ people;
    let rounded = Math.round(total * 100) / 100;
    return rounded;
 }

 


  const handleBillAmount = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value = e.target.value;

    let parsedValue = parseFloat(value);

    // parse float parses a string and returns a floating point number
    // then toFixed formats the number using fixed-point notation(the numbers of digits to appear after the decimal points)
    if (!isNaN(parsedValue) || parsedValue > 0) {

      let roundedValue = parseFloat(parsedValue.toFixed(2)); // Round to two decimal places

      setBill(roundedValue);

      setIsFilled(true);

    } else {

      setBill(0);

      setIsFilled(false);

    }
  }

  // if value does not equal empty string arrays & if it's a number & is positive then we set people count, if not it's undefined!
  const handlePeople = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value = e.target.value;

    if (value !== '' && /^\d*\.?\d+$/.test(value) && Number(value)) {

      setPeopleCount(Math.ceil(Number(e.target.value)));

      setIsFilled2(true);

    } else {

      setPeopleCount(undefined);

      setIsFilled2(false);

    }

  }



  const fivePercent = () => {
    setTip(0.05);
    setIsSelected(true);
  }

  const tenPercent = () => {
    setTip(0.10);
    setIsSelected(true);
  }

  const fifteenPercent = () => {
    setTip(0.15);
    setIsSelected(true);
  }

  const quarterPercent = () => {
    setTip(0.25);
    setIsSelected(true);
  }

  const fiftyPercent = () => {
    setTip(0.50);
    setIsSelected(true);
  }

  const customTip = () => {
    setTip(0.20);
    setIsSelected(true);
  }

  useEffect(() => {
    if (isFilled && isFilled2 && isSelected) {
      let total1 = tipForEach(bill!, tip, peopleCount!);
      let total2 = totalForEach(bill!, tip, peopleCount!);

      setTipPerPerson(`$${total1.toLocaleString("en", { minimumFractionDigits: 2 })}`);
      setTotalPerPerson(`$${total2.toLocaleString("en", { minimumFractionDigits: 2 })}`);
    }
  }, [isFilled, isFilled2, isSelected, bill, peopleCount, tip]);

  const handleReset = () => {
    if (isFilled && isFilled2 && isSelected) {
      setIsFilled(false);
      setIsFilled2(false);
      setIsSelected(false);
      setBill(undefined);
      setPeopleCount(undefined);
      setTip(0);
      setTipPerPerson('$0.00')
      setTotalPerPerson('$0.00')
    }
  }



  const tipClass: string = 'px-5 py-2 bg-darkCyan rounded-md focus:bg-cyan focus:text-darkCyan';
  const pickedTipClass: string = 'px-5 py-2 rounded-md bg-cyan text-darkCyan';

  return (
    <div className="Bg flex min-h-screen flex-col items-center font-space-mono">
     <h1 className="pt-20 pb-8 text-2xl header">SPLI <br /> TTER</h1>
      <div className="card grid grid-cols-2 mt-10 p-7 gap-9 bg-white rounded-3xl ">
        <div className="col-span-1 column py-3 ps-3 pe-2">

   
          <div>
            <p className="text-gray mb-1 text-sm">Bill</p>
            <div className=" bg-offWhite px-4 py-1.5 rounded-sm flex flex-row justify-between items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17"><path fill="#9EBBBD" d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z" /></svg>
              <input
                type="number"
                value={bill ?? ''}
                onChange={handleBillAmount}
                className="bg-offWhite text-2xl text-end border-0 text-darkCyan"
                min='0'
                step='0.01'
                placeholder="0"
              />
          
            </div>
          </div>

          {/* Select Tip */}
          <div className="mt-10 ">
            <p className="text-gray mb-3 text-sm"> Select Tip %</p>
            <div className="grid grid-cols-3 gap-3 text-xl text-offWhite">
              <button onClick={fivePercent} className={tip === 0.05 ? pickedTipClass : tipClass}>5%</button>
              <button onClick={tenPercent} className={tip === 0.10 ? pickedTipClass : tipClass}>10%</button>
              <button onClick={fifteenPercent} className={tip === 0.15 ? pickedTipClass : tipClass}>15%</button>
              <button onClick={quarterPercent} className={tip === 0.25 ? pickedTipClass : tipClass}>25%</button>
              <button onClick={fiftyPercent} className={tip === 0.50 ? pickedTipClass : tipClass}>50%</button>
              <button onClick={customTip} className={tip === 0.20 ? pickedTipClass : 'py-2 bg-offWhite text-gray rounded-lg focus:bg-cyan focus:text-darkCyan'}>Custom</button>
            </div>
          </div>

          {/* Number of People */}
          <div className="mt-10">
            <p className="text-gray mb-1 text-sm">Number of People</p>
            <div className="bg-offWhite px-4 py-1.5 rounded-sm flex flex-row justify-between items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16"><path fill="#9EBBBD" d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.1 1.666 1.1 2.724c0 1.06-.37 1.976-1.1 2.725-.73.75-1.623 1.13-2.654 1.13-1.03 0-1.924-.38-2.653-1.13-.73-.749-1.1-1.666-1.1-2.725 0-1.058.37-1.975 1.1-2.724C4.675.379 5.567 0 6.598 0z" /></svg>
              <input value={peopleCount ?? ''} onChange={handlePeople} className="bg-offWhite text-2xl text-end border-0 border:border-0 text-darkCyan" min='0' type="number" placeholder="0" />
            </div>
          </div>
        </div>

        <div className="col-span-1 column bg-darkCyan rounded-2xl px-9 flex flex-col justify-between">

          <div>
            {/* Tip Amount */}
            <div className="grid grid-cols-2 mt-12 items-center">
              <div className="flex flex-col">
                <p className="text-offWhite text-sm">Tip Amount</p>
                <p className="text-lightGray smallTxt">/ person</p>
              </div>
              <p className="col-span-1 flex justify-end text-5xl text-cyan">{tipPerPerson}</p>
            </div>

            {/* Total Tip Amount */}
            <div className="grid grid-cols-2 mt-8 items-center">
              <div className="flex flex-col">
                <p className="text-offWhite text-sm">Total</p>
                <p className="text-lightGray smallTxt">/ person</p>
              </div>
              <p className="col-span-1 flex justify-end text-5xl text-cyan">{totalPerPerson}</p>
            </div>
          </div>

          <button onClick={handleReset} className={isFilled && isFilled2 && isSelected ? "mb-10 resetBtn rounded-sm text-center cursor-pointer !bg-cyan !text-darkCyan" : "mb-10 resetBtn rounded-sm text-center cursor-default hover:bg-cyan hover:text-darkCyan"}>
            <p className="text-xl py-1.5">
              RESET
            </p>
          </button>

        </div>
      </div>
    </div>
  )

  }


// type TipPercentageOption = '5' | '10' | '15' | '25' | '50' | 'custom';

// const TipCalculator: React.FC = () => {
//   const [bill, setBill] = useState<number>(0);
//   const [numPeople, setNumPeople] = useState<number>(1);
//   const [tipPercentage, setTipPercentage] = useState<TipPercentageOption>('15');

//   const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBill(parseFloat(e.target.value));
//   };

//   const handleNumPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNumPeople(parseInt(e.target.value));
//   };

  // const handleTipPercentageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setTipPercentage(e.target.value as TipPercentageOption);
  // };

  // const calculateTip = (): { tipAmount: number; totalAmount: number; amountPerPerson: number } => {
  //   const tipAmount = bill * (parseInt(tipPercentage) / 100);
  //   const totalAmount = bill + tipAmount;
  //   const amountPerPerson = totalAmount / numPeople;
  //   return {
  //     tipAmount,
  //     totalAmount,
  //     amountPerPerson,
  //   };
  // };

  //const { tipAmount, totalAmount, amountPerPerson } = calculateTip();


    // <div className='min-h-screen w-full Bg  flex flex-col items-center'>
      
    //   <h1>Tip Calculator</h1>
    //   <label>
    //     Bill Amount:
    //     <input
    //       type="number"
    //       value={bill}
    //       onChange={handleBillChange}
    //       placeholder="Enter bill amount"
    //     />
    //   </label>
    //   <br />
    //   <label>
    //     Number of People:
    //     <input
    //       type="number"
    //       value={numPeople}
    //       onChange={handleNumPeopleChange}
    //       placeholder="Enter number of people"
    //     />
    //   </label>
    //   <br />
    //   <label>
    //     Tip Percentage:
    //     <select value={tipPercentage} onChange={handleTipPercentageChange}>
    //       <option value="5">5%</option>
    //       <option value="10">10%</option>
    //       <option value="15">15%</option>
    //       <option value="25">25%</option>
    //       <option value="50">50%</option>
    //       <option value="custom">Custom</option>
    //     </select>
    //     {tipPercentage === 'custom' && (
    //       <input
    //         type="number"
    //         value={tipPercentage}
    //       // onChange={handleTipPercentageChange}
    //       />
    //     )}
    //   </label>
    //   <br />
    //   <p>Tip Amount: ${tipAmount.toFixed(2)}</p>
    //   <p>Total Amount: ${totalAmount.toFixed(2)}</p>
    //   <p>Amount Per Person: ${amountPerPerson.toFixed(2)}</p>
    // </div>

