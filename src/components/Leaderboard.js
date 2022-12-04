export function Leaderboard ({ leaderboard }) {
    return (
        <div id="leaderboard">
          <h2>{leaderboard.title}</h2>
          <ol>
            {/* This is simply rendering a new list item for each score item in leaderboard */}
            {leaderboard.scores.map((item, index) => {
              if (index > 10) return null;
              return (
                  <li key={index}>
                    <span>
                        Name: 
                    </span>
                    <span>
                        Time: 
                    </span>
                    <span>
                        {item.name}
                    </span> 
                    <span>
                        {item.time}
                    </span>
                  </li>
              )
            })}
          </ol>
        </div>
    )
}