import { render, screen } from '@testing-library/react';
import App from './App'
import sum from './sum'
import GreetComp from './components/GreetComp';
import img from './components/img';
//import '@testing-libary/jest-dom'


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(//i);
//   expect(linkElement).toBeInTheDocument();
// });


// test("testing for sum function", ()=>{
//   //expect(sum(10,20),toBe(0))
//   //render(<sum />);
//   expect (sum(10,20)).toBe(30);
// })

// test('Check wether the sentence is correct or not', () => {
//   render(<GreetComp />);
//   const title = screen.getByText(/Good Afternoon All My Dear Friends/i);
//   expect(title).toBeInTheDocument();
// });

//     test("Test case First", () =>{
//       render(<img />);
//       const imgtitle = screen.getByTitle("Ai generated image");
//       expect(imgtitle).toBeInTheDocument();

// });

// test('Check wether the image is correct or not', () => {
//   render(<App />);
//   const title = screen.getByTitle("Ai generated image");
//   expect(title).toBeInTheDocument();
// });


// test("test case for input box",()=>{
//   render(<App />);
//   const chechInput = screen.getByRole("textbox");
//   expect(chechInput).toBeInTheDocument();

//   let chechInputPlaceholder = screen.getByPlaceholderText("Enter user name");
//   expect(chechInputPlaceholder).toBeInTheDocument();

 
//   expect(chechInput).toHaveAttribute("name", "username");

 
//   expect(chechInput).toHaveAttribute("id", "userID");

  

// })


// describe("U1 test case group",()=>{
//   test("test case 1", ()=>{
//     render(<App />);
//     let chechInput = screen.getByRole("textbox");
//     expect(chechInput).toHaveAttribute("name", "username");
//   })

//     test("test case 2", ()=>{
//     render(<App />);
//     let chechInput = screen.getByRole("textbox");
//     expect(chechInput).toHaveAttribute("name", "username");
//   })

  


// })


// describe.only("APi case group",()=>{
//   test("test case 4", ()=>{
//     render(<App />);
//     let chechInput = screen.getByRole("textbox");
//     expect(chechInput).toHaveAttribute("name", "username");
//   })

//     test("test case 5", ()=>{
//     render(<App />);
//     let chechInput = screen.getByRole("textbox");
//     expect(chechInput).toHaveAttribute("name", "username");
//   })
//     test("test case 6", ()=>{
//     render(<App />);
//     let chechInput = screen.getByRole("textbox");
//     expect(chechInput).toHaveAttribute("name", "username");
//   })
// })


describe("APi case group",()=>{
  test("test case 7", ()=>{
    render(<App />);
    let chechInput = screen.getByRole("textbox");
    expect(chechInput).toHaveAttribute("name", "username");
  })

    test("test case 8", ()=>{
    render(<App />);
    let chechInput = screen.getByRole("textbox");
    expect(chechInput).toHaveAttribute("name", "username");
  })
    test("test case 9", ()=>{
    render(<App />);
    let chechInput = screen.getByRole("textbox");
    expect(chechInput).toHaveAttribute("name", "username");
  })

  
  describe("Nested U1 test case group", ()=>{
    test(" nested test case", ()=>{
    render(<App />);
    let chechInput = screen.getByRole("textbox");
    expect(chechInput).toHaveAttribute("name", "username");
  })
})

})



