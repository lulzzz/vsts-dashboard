import { BuildResult, BuildStatus } from 'vso-node-api/interfaces/BuildInterfaces';
import { BuildData } from './build-data';

test('the constructor sets up the internals', () => {
    const build = new BuildData({
        sourceBranch: "refs/heads/master",
        buildNumber: 76,
        definition: {name: "build-definition-name"},
        finishTime: "2018-05-24T19:44:57.0400704Z",
        requestedFor: {displayName: "bob dylan"},
        result: "succeeded",
        startTime: "2018-05-24T19:44:19.0643128Z",
        status: "completed",
        url: "https://fabrikam.visualstudio.com/7120302e-1787-4c3a-a75c-6cbe603c5dc8/_apis/build/Builds/76",
    });
    expect(build.branch).toBe("refs/heads/master");
    expect(build.buildNumber).toBe(76);
    expect(build.endTime).toBe("2018-05-24T19:44:57.0400704Z");
    expect(build.name).toBe("build-definition-name");
    expect(build.result).toBe("succeeded");
    expect(build.startTime).toBe("2018-05-24T19:44:19.0643128Z");
    expect(build.status).toBe("completed");
    expect(build.url).toBe("https://fabrikam.visualstudio.com/7120302e-1787-4c3a-a75c-6cbe603c5dc8/_apis/build/Builds/76");
    expect(build.user).toBe("bob dylan");
});

test('isFinished can return true based on rules', () => {
    const build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.Completed,
    });

    expect(build.isFinished()).toBe(true);
});

test('isFinished can return false if it isnt running', () => {
    const build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.InProgress,
    });

    expect(build.isFinished()).toBe(false);
});

test('isQueued can return true if the status is a certain value', () => {
    let build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.NotStarted,
    });

    expect(build.isQueued()).toBe(true);

    build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.Postponed,
    });

    expect(build.isQueued()).toBe(true);
});

test('isQueued can return false if the status is a certain value', () => {
    const build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.Completed,
    });

    expect(build.isQueued()).toBe(false);
});

test('isRunning can return true if the status is a certain value', () => {
    let build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.Cancelling,
    });

    expect(build.isRunning()).toBe(true);

    build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.InProgress,
    });

    expect(build.isRunning()).toBe(true);
});

test('isRunning can return false if the status is a certain value', () => {
    const build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        status: BuildStatus.Completed,
    });

    expect(build.isRunning()).toBe(false);
});

test('wasSuccessful can return true if the result is a certain value', () => {
    const build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        result: BuildResult.Succeeded,
    });

    expect(build.wasSuccessful()).toBe(true);
});

test('wasSuccessful can return false if the result is a certain value', () => {
    const build = new BuildData({
        definition: {name: ""},
        requestedFor: {displayName: ""},
        result: BuildResult.Canceled,
    });

    expect(build.wasSuccessful()).toBe(false);
});
