document.addEventListener('DOMContentLoaded', ()=>
{
    let button = document.getElementById('button');
    let textarea = document.getElementsByTagName('textarea')[0];

    button.addEventListener('click', ()=>
    {
        let style = document.getElementById('style');

        if(style)
        {
            style.remove();
        }
        
        let newStyle = document.createElement('style');        

        newStyle.id = 'style';        
        document.head.appendChild(newStyle);
        
        let styleText = textarea
        newStyle.innerHTML = textarea.value;
    });

    textarea.addEventListener('keydown', (event)=>
    {
      let selectionStart = textarea.selectionStart;
      let selectionEnd = textarea.selectionEnd;
      
      if(event.key == 'Enter')
      {        
        event.preventDefault();
        const currentLine = getCurrentLine(textarea.value, textarea.selectionStart);
        const indentation = getIndentationLevel(currentLine);
        const newLine = '\n' + ' '.repeat(indentation);
        textarea.value = textarea.value.substring(0, textarea.selectionStart) + newLine + textarea.value.substring(textarea.selectionEnd);
        textarea.setSelectionRange(textarea.selectionStart + newLine.length, textarea.selectionStart + newLine.length);
      }
      if(event.key == 'Tab')
      {
        event.preventDefault();
        textarea.value = textarea.value.substring(0, selectionStart) + '    ' + textarea.value.substring(selectionEnd);
        textarea.setSelectionRange(selectionStart + 4, selectionStart + 4);
      }
    });
});

function getCurrentLine(text, position)
{
  const lines = text.split('\n');
  let lineIndex = 0;
  let charCount = 0;

  while (charCount <= position)
  {
    charCount += lines[lineIndex].length + 1; // Account for newline characters
    lineIndex++;
  }
  
  return lines[lineIndex - 1];
}
  
function getIndentationLevel(line)
{
  let indentation = 0;
  for (let i = 0; i < line.length; i++)
  {
    if (line[i] !== ' ')
    {
      break;
    }
    indentation++;
  }
  return indentation;
}
