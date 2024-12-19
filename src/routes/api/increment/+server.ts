import { json } from '@sveltejs/kit';

// Counter for tracking requests
let requestCounter = 0;

async function fetchGitHubStats(username: string) {
  // Increment counter for each request
  requestCounter++;

  // Log the request number
  console.log(`request: Analyzing GitHub stats for user ${username}`);

  // Special milestone logs
  if (requestCounter % 100 === 0) {
    console.log(`request: ${requestCounter}th user analyzed their github!`);
  } else {
    const lastDigit = requestCounter % 10;
    const suffix = lastDigit === 1 ? 'st' : lastDigit === 2 ? 'nd' : lastDigit === 3 ? 'rd' : 'th';
    console.log(`request: ${requestCounter}${suffix} user analyzed their github!`);
  }

  try {
    // Fetch user's contribution data
    const userResponse = await fetch(`https://api.github.com/users/${username}`);

    // Fetch total commits
    const commitsResponse = await fetch(
      `https://api.github.com/search/commits?q=author:${username}`
    );

    if (!userResponse.ok) {
      console.log(`request: Error - User ${username} not found`);
      throw new Error('User not found');
    }

    const userData = await userResponse.json();
    const commitsData = await commitsResponse.json();

    console.log(`request: Successfully analyzed ${username}'s github!`);

    return {
      success: true,
      totalCommits: commitsData.total_count,
      totalRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      avatarUrl: userData.avatar_url,
      bio: userData.bio || 'No bio available'
    };
  } catch (error) {
    console.error("request: GitHub API error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error fetching GitHub data",
    };
  }
}

export async function GET({ url }) {
  const username = url.searchParams.get('username');

  if (!username) {
    console.log(`request: Error - Username missing`);
    return json({
      success: false,
      message: "Username is required"
    });
  }

  return json(await fetchGitHubStats(username));
}