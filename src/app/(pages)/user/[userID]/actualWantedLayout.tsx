<div className="border border-black w-screen h-screen flex">
      {/* SIDE PANEL */}
      <div className="w-64 full border border-black">SIDE PANEL</div>

      {/* MAIN SCREEN - TOP BAR + MAIN CONTENT + RIGHT PANEL */}
      <div className="flex flex-col flex-1 border border-red-500">
        {/* TOP BAR */}
        <div className="h-16 bg-white border-b border-blue-500 w-full">TOP BAR</div>

        {/* MAIN CONTENT + SIDE PANEL */}
        <div className="flex w-full h-full border border-green-700">
          {/* MAIN CONTENT */}
          <div className="w-4/5 h-full bg-white border border-black">MAIN CONTENT</div>

          {/* RIGHT PANEL */}
          <div className="w-1/5 h-full border border-black">RIGHT PANEL</div>
        </div>
      </div>
    </div>