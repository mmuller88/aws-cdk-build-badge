# API Reference

**Classes**

Name|Description
----|-----------
[BuildBadge](#aws-cdk-build-badge-buildbadge)|*No description*


**Structs**

Name|Description
----|-----------
[BuildBadgeProps](#aws-cdk-build-badge-buildbadgeprops)|*No description*



## class BuildBadge  <a id="aws-cdk-build-badge-buildbadge"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new BuildBadge(parent: Stack, id: string, props?: BuildBadgeProps)
```

* **parent** (<code>[Stack](#aws-cdk-core-stack)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BuildBadgeProps](#aws-cdk-build-badge-buildbadgeprops)</code>)  *No description*
  * **defaultProjectName** (<code>string</code>)  Specify a default project name. __*Default*__: not set
  * **hideAccountID** (<code>string</code>)  Thats a little safety feature. __*Default*__: not set and account id will be shown as 123



### Properties


Name | Type | Description 
-----|------|-------------
**badgeUrl** | <code>string</code> | <span></span>



## struct BuildBadgeProps  <a id="aws-cdk-build-badge-buildbadgeprops"></a>






Name | Type | Description 
-----|------|-------------
**defaultProjectName**? | <code>string</code> | Specify a default project name.<br/>__*Default*__: not set
**hideAccountID**? | <code>string</code> | Thats a little safety feature.<br/>__*Default*__: not set and account id will be shown as 123



