### What would you add to your solution if you had more time?

I'd play more with a "group price by" feature, I was able to get similar results to the production web page, but the code relied on a static price threshold rather than dynamic, changeable by the user, so I should have used a different approach. Very nice exercise :)

WebSocket connection might be handled even more gracefully and when working with a Fast Refresh sometimes old values might be persisted which results in a negative spread, which I didn't observe during normal usage.

Also asks and bids calculation should go to the business logic layer for better reusability and testability (as you can see in the tests only UI is covered), in this case for simplicity I have used `useState`.

Another thing to consider is throttling of the screen renders, for example, render every second or two, right now it's re-rendered on every ask/bid change.

Instead of hardcoding texts in the JSX we should use `i18next` or similar solution.

### What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

This is probably a more web-related question.

### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

By chosen language, you mean any language of my choice or the language I used for this project? If it any choice it will be Dart's null safety, constructors are nicer to write and read, and the language is now super strict with types, similar to Swift.

```dart
@immutable
class User {
  const User({
    this.avatarUrl,
    this.firstName,
    required this.id,
    this.lastName,
  });

  final String? avatarUrl;
  final String? firstName;
  final String id;
  final String? lastName;
}
```

### How would you track down a performance issue in production? Have you ever had to do this?

It is a good practice to test the app on a lower-end Android device to check the performance even before the release. Also, some people like to update to the iOS beta and firing issues that something's not working, so checking the app on beta versions also might be a good practice. Doing that I'm not sure how the app might suddenly get performance issues if the code is written correctly. If, however, some cleanup wasn't performed or lists weren't optimized enough, I would go through the latest commits for affected screens, check CPU/memory usage using Xcode, try to reproduce the issue and pinpoint the problem.

### Can you describe common security concerns to consider for a frontend developer?

I'm not familiar with the web, but when it comes to mobile the most obvious will be to store sensitive data in the Keychain/Keystore and using HTTPS over HTTP. Some API keys can be extracted from the code using reverse engineering, so if those keys provide some kind of admin access somewhere they should probably be served securely by the API and stored in the places mentioned above. Where is possible we should avoid using web views in the mobile application, moreover enabling JS there since they are vulnerable to the common web attacks. There are additional options like pinning, request signing etc.

And obviously, we shouldn't give up company data on a phone call :)

### How would you improve the *** API that you just used?

I shouldn't mention *** in the repo.

<img width="324" alt="Failure on a production website" src="https://user-images.githubusercontent.com/14123304/116256698-b6824380-a773-11eb-9f0a-b733942ff02c.png">

The production server was down for a couple of hours.

I noticed that the `snapshot` event has different sorting comparing to the next events containing asks and bids, maybe it's the way it should be and snapshot means something else in this case, but I can see some inconsistency here. Other than that I can't think of anything else.
